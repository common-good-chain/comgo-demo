<template>
  <div class="status-card">
    <div class="card">
      <div class="card-content">
        <div class="media-content" style="margin-bottom: 1rem;">
          <span class="subtitle is-5 has-text-weight-semibold"
            >Recommendations</span
          >
        </div>
        <div
          v-for="(data, index) in recommendations"
          :key="index"
          class="media"
        >
          <div class="media-left">
            <figure class="image is-32x32">
              <img
                :src="data.imgSrc"
                style="object-fit: cover; border-radius: 5px;"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content data-container">
            <div class="left-content">
              <p class="title is-6">{{ data.name }}</p>
              <p class="subtitle is-7">{{ data.info }}</p>
            </div>
            <div class="right-content">
              <b-button type="is-primary is-small" @click="displayError()"
                >Follow</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  /*max-width: 260px;*/
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
.data-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filters-container {
  flex-direction: column;
}
</style>

<script>
export default {
  data() {
    return {
      recommendations: [
        {
          name: 'My NGO',
          info: 'Cool story',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png'
        },
        {
          name: 'Social Enter...',
          info: 'Cool story',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png'
        },
        {
          name: 'Foundation',
          info: 'Cool story',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png'
        }
      ]
    }
  },
  methods: {
    displayError: function() {
      this.$buefy.toast.open({
        duration: 1500,
        message: `Ooops. This is not yet implemented`,
        position: 'is-top',
        type: 'is-warning'
      })
    }
  }
}
</script>
