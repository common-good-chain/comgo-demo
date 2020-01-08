<template>
  <div class="status-card">
    <div class="card">
      <div class="card-content">
        <div class="media-content" style="margin-bottom: 1rem;">
          <span class="subtitle is-5 has-text-weight-semibold"
            >📅 Upcoming Events</span
          >
        </div>
        <div style="max-height: 200px; overflow: scroll;">
          <div v-for="(data, index) in events" :key="index" class="media">
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
                <p class="subtitle is-7">
                  <span class="is-7">{{ data.when }}</span>
                  <b-icon icon="clock" size="is-small"></b-icon>
                </p>
              </div>
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
      events: [
        {
          name: 'My NGOs',
          info: 'Gift giving',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png',
          when: 'Today'
        },
        {
          name: 'Social Enter...',
          info: 'Carol singing',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png',
          when: '7d'
        },
        {
          name: 'Foundation',
          info: 'Fundraiser',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png',
          when: '2w'
        },
        {
          name: 'Foundation 2',
          info: 'Fundraiser',
          imgSrc: 'https://bulma.io/images/placeholders/96x96.png',
          when: '3w'
        }
      ]
    }
  }
}
</script>
