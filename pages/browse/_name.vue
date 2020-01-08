<template>
  <div>
    <navbar></navbar>
    <div class="section override-top-padding">
      <div class="container">
        <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
        <talent-search :all-talents="allTalents"></talent-search>
        <div v-if="loading" class="columns" style="height: 70vh;"></div>
        <div v-else class="columns">
          <categories
            v-if="allCategories && selectedCategory"
            :all-categories="allCategories"
            :selected-category="selectedCategory"
          >
          </categories>
          <talents
            :talents-to-show="orderedTalentsToShow"
            :sort-talents-by="sortTalentsBy"
            @change-sort-by="onChangeSortBy"
          ></talents>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<style>
.override-top-padding {
  padding-top: 1rem !important;
}
</style>

<script>
import Navbar from '~/components/Navbar'
import MyFooter from '~/components/MyFooter'
import Categories from '~/components/Categories'
import Talents from '~/components/Talents'
import TalentSearch from '~/components/TalentSearch'

import _ from 'lodash'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Navbar,
    MyFooter,
    Categories,
    Talents,
    TalentSearch
  },
  data() {
    return {
      autoCompleteStyle: {
        defaultInput: 'input is-large'
      },
      loading: false,
      allCategories: [],
      selectedCategory: null,
      allTalents: [],
      orderedTalentsToShow: []
    }
  },
  computed: {
    name() {
      return this.$route.params.name
    },
    sortTalentsBy() {
      return this.$store.getters['talents/sortBy']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      this.loading = true
      const talentsResponse = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
                    talents {
                      id
                      name
                      isDisabled
                      occupation
                      profileImg {
                        url
                      }
                      isCharitable                      
                      pricePersonalVideo
                      createdAt
                      categories {
                        id
                        displayedNameEsp
                      }
                    }
                  }
              `
        }
      })
      talentsResponse.data.talents &&
        talentsResponse.data.talents.forEach(talent => {
          talent.profileImgSrc = this.fetchImage(talent)
        })
      const allTalents = talentsResponse.data.talents
      const categoriesResponse = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
                categories {
                  id
                  name
                  displayedNameEsp
                  parentCategory {
                    id
                    name
                    displayedNameEsp
                  }
                }
              }
              `
        }
      })
      const allCategories = categoriesResponse.data.categories
      const selectedCategory = _.find(allCategories, ['name', this.name])
      let categoriesToIntersect = []
      if (!selectedCategory.parentCategory) {
        categoriesToIntersect = _.map(
          _.filter(allCategories, {
            parentCategory: { id: selectedCategory.id }
          }),
          'id'
        )
      }
      categoriesToIntersect.push(selectedCategory.id)
      const talentsToShow = _.filter(allTalents, function(talent) {
        return (
          _.intersection(_.map(talent.categories, 'id'), categoriesToIntersect)
            .length > 0
        )
      })
      this.allCategories = allCategories
      this.selectedCategory = selectedCategory
      this.allTalents = allTalents
      this.orderedTalentsToShow = this.orderTalentsBy(
        talentsToShow,
        this.sortTalentsBy
      )
      this.loading = false
    },
    fetchImage(talent) {
      const path = _.get(talent, 'profileImg.url')
      if (!path) {
        return '/images/profileImgFallback.png'
      }
      const imgSrc =
        process.env.NODE_ENV === 'production' ? path : `${apiUrl}${path}`
      return imgSrc
    },
    orderTalentsBy: function(talents, value) {
      switch (value) {
        case 'createdAt':
          return _.reverse(_.sortBy(talents, 'createdAt'))
        case 'pricePersonalVideoLow':
          return _.sortBy(talents, 'pricePersonalVideo')
        case 'pricePersonalVideoHigh':
          return _.reverse(_.sortBy(talents, 'pricePersonalVideo'))
        default:
          return _.reverse(_.sortBy(talents, 'createdAt'))
      }
    },
    onChangeSortBy: function(value) {
      this.$store.commit('talents/changeSortMethod', value)
      this.orderedTalentsToShow = this.orderTalentsBy(
        this.orderedTalentsToShow,
        this.sortTalentsBy
      )
    }
  }
}
</script>
