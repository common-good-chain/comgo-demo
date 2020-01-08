<template>
  <div class="column is-6">
    <!-- <div class="level">
      <div class="level-item level-right">
        <b-dropdown aria-role="list" @change="handleDropdownChange">
          <button slot="trigger" class="button is-outlined">
            <template v-if="sortTalentsBy == 'createdAt'">
              <span>Ordenar por: Novedad</span>
            </template>
            <template v-if="sortTalentsBy == 'pricePersonalVideoLow'">
              <span>Ordenar por: Precio más bajo</span>
            </template>
            <template v-if="sortTalentsBy == 'pricePersonalVideoHigh'">
              <span>Ordenar por: Precio más alto</span>
            </template>
            <b-icon icon="menu-down"></b-icon>
          </button>

          <b-dropdown-item :value="'createdAt'" aria-role="listitem"
            >Novedad</b-dropdown-item
          >
          <b-dropdown-item
            :value="'pricePersonalVideoHigh'"
            aria-role="listitem"
            >Precio más alto</b-dropdown-item
          >
          <b-dropdown-item :value="'pricePersonalVideoLow'" aria-role="listitem"
            >Precio más bajo</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div> -->
    <div v-if="items.length" class="container">
      <div v-for="(data, index) in items" :key="index">
        <news-card v-if="data.type == 'NEWS'" :data="data"></news-card>
        <event-card v-if="data.type == 'EVENT'" :data="data"></event-card>
        <project-card v-if="data.type == 'PROJECT'" :data="data"></project-card>
        <update-card v-if="data.type == 'UPDATE'" :data="data"></update-card>
      </div>
    </div>
    <div v-else class="box empty-state-box has-text-centered">
      <div class="content">
        <h2 class="title is-size-4 has-text-grey">
          No results for your current feed! 🤦‍♀️
        </h2>
        <p class="subtitle has-text-grey-light">
          Try removing some filters
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-state-box {
  padding: 3rem;
}
.category-tag {
  display: flex;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 0 12px 7px 0;
  width: 100%;
  padding: 10px;
}
.category-tag:hover {
  cursor: pointer;
  background-color: #e8e8e8;
}
.category-tag.selected-category {
  background-color: #a13aff;
  color: #fff;
  display: flex;
  border-radius: 10px;
  margin: 0 12px 7px 0;
  width: 100%;
  padding: 10px;
}
.category-tag.selected-category:hover {
  background-color: #860ff3;
}
</style>

<script>
import NewsCard from '~/components/NewsCard'
import EventCard from '~/components/EventCard'
import ProjectCard from '~/components/ProjectCard'
import UpdateCard from '~/components/UpdateCard'

export default {
  components: {
    NewsCard,
    EventCard,
    ProjectCard,
    UpdateCard
  },
  props: ['items', 'sortTalentsBy'],
  methods: {
    handleDropdownChange(value) {
      this.$emit('change-sort-by', value)
    }
  }
}
</script>
