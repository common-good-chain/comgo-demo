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
          <left-column class="is-hidden-mobile"></left-column>
          <feed-items :items="filteredItems"></feed-items>
          <right-column @filters-change="onChangeFilters"></right-column>
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
      filteredItems: [],
      filterKeys: {
        showNews: 'NEWS',
        showEvents: 'EVENT',
        showProjects: 'PROJECT',
        showUpdates: 'UPDATE',
        showProducts: 'PRODUCT'
      }
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
    onChangeFilters: function(data) {
      const filterKeys = this.filterKeys
      const allItems = this.allItems
      const keys = Object.keys(data)
      const activeFilters = keys.filter(function(key) {
        return data[key]
      })
      const activeKeys = _.map(activeFilters, function(filter) {
        return filterKeys[filter]
      })
      const items = _.filter(allItems, function(item) {
        return _.includes(activeKeys, item.type)
      })
      this.filteredItems = items
    }
  }
}
</script>
