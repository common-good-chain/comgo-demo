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
          name: 'Comun. de M...',
          info: 'Institution',
          imgSrc:
            'https://pbs.twimg.com/profile_images/1185678375647662080/-sj0LOtW_400x400.png'
        },
        {
          name: 'ACH Spain',
          info: 'NGO',
          imgSrc:
            'https://assets.funraise.io/widget/client/e903bf1c-1df2-4a95-a37c-61a636c7e863/3237/1.3/6d6d61bd3be7522da5756fdcad35e539d378d890.png'
        },
        {
          name: 'ComGo',
          info: 'Tech NGO',
          imgSrc: 'https://comgo.io/_nuxt/img/logo.897afa0.png'
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
