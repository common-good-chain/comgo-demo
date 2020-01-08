<template>
  <section class="section is-small">
    <b-loading :active.sync="loading"></b-loading>
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered">
          <div class="content">
            <h2 class="is-title is-size-2">Flikers de la semana 🔥</h2>
            <p class="is-size-5 has-text-weight-light">
              Descubre nuestros flikers más populares.
            </p>
          </div>
        </div>
      </div>
      <br />
      <div class="container column is-10">
        <div v-if="talentsToShow" class="columns is-multiline">
          <div
            v-for="(data, index) in talentsToShow"
            :key="index"
            class="column is-12-mobile is-3-tablet is-3-desktop"
          >
            <talent-card :talent-data="data"></talent-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TalentCard from '~/components/TalentCard'

import _ from 'lodash'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    TalentCard
  },
  data() {
    return {
      talentsToShow: null,
      loading: false
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
                    talents (limit:4) {
                      id
                      name
                      occupation
                      profileImg {
                        url
                      }
                      pricePersonalVideo
                      createdAt
                      categories (where: {key:"FEATURED"})  {
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
      this.talentsToShow = _.filter(talentsResponse.data.talents, function(o) {
        return (
          o.categories.length && o.name && o.occupation && o.pricePersonalVideo
        )
      })
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
    }
  }
}
</script>

<style scoped>
.columns.is-spaced {
  justify-content: space-between;
}
</style>
