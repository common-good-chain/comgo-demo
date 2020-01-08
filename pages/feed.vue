<template>
  <div>
    <navbar></navbar>
    <br />
    <br />
    <div class="section">
      <div class="container">
        <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
        <div v-if="loading" class="columns" style="height: 70vh;"></div>
        <div v-else class="columns">
          <left-column></left-column>
          <feed-items :items="filteredItems"></feed-items>
          <right-column></right-column>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.override-top-padding {
  padding-top: 1rem !important;
}
</style>

<script>
import Navbar from '~/components/Navbar'
import FeedItems from '~/components/FeedItems'
import LeftColumn from '~/components/LeftColumn'
import RightColumn from '~/components/RightColumn'

import _ from 'lodash'
import feedItems from '~/static/feedItems.js'

export default {
  components: {
    Navbar,
    FeedItems,
    LeftColumn,
    RightColumn
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
      orderedTalentsToShow: [],
      allItems: [],
      filteredItems: []
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
    fetchData: function() {
      this.loading = true
      this.allItems = feedItems.data
      this.filteredItems = this.allItems
      setTimeout(() => (this.loading = false), 1000)
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
