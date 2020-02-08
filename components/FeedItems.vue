<template>
  <div class="column is-6">
    <div v-if="items.length" class="container">
      <div v-for="(data, index) in items" :key="index">
        <news-card v-if="data.type == 'NEWS'" :data="data"></news-card>
        <event-card v-if="data.type == 'EVENT'" :data="data"></event-card>
        <project-card v-if="data.type == 'PROJECT'" :data="data"></project-card>
        <update-card v-if="data.type == 'UPDATE'" :data="data"></update-card>
        <product-card v-if="data.type == 'PRODUCT'" :data="data"></product-card>
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

<style scoped></style>

<script>
import NewsCard from '~/components/NewsCard'
import EventCard from '~/components/EventCard'
import ProjectCard from '~/components/ProjectCard'
import UpdateCard from '~/components/UpdateCard'
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    NewsCard,
    EventCard,
    ProjectCard,
    UpdateCard,
    ProductCard
  },
  props: ['items', 'sortTalentsBy']
}
</script>
