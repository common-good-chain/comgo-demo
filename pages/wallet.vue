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
          <wallet-container></wallet-container>
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
import LeftColumn from '~/components/LeftColumn'
import WalletContainer from '~/components/WalletContainer'

import _ from 'lodash'
import feedItems from '~/static/feedItems.js'

export default {
  components: {
    Navbar,
    LeftColumn,
    WalletContainer
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
        showUpdates: 'UPDATE'
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
