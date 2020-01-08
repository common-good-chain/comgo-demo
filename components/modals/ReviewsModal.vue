<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <div v-for="(review, index) in reviewsData" :key="index" class="box">
        <star-rating
          style="margin: 0.5rem 0;"
          :rating="review.rating"
          :increment="0.1"
          :read-only="true"
          :star-size="20"
          :rounded-corners="true"
          text-class="subtitle is-size-6"
        ></star-rating>
        <p class="is-italic">"{{ review.review }}"</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.modal-card-body {
  border-radius: 10px;
}
</style>

<script>
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  props: {
    reviewsData: Array
  }
}
</script>
