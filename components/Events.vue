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
::-webkit-scrollbar {
  display: none;
}
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
          name: 'UNTIL Tech...',
          info: 'Innovation talk',
          imgSrc:
            'https://until.un.org/sites/all/themes/custom/until/app-assets/images/until-logo.svg',
          when: 'Today'
        },
        {
          name: 'Comun. de M...',
          info: 'Homeless ...',
          imgSrc:
            'https://pbs.twimg.com/profile_images/1185678375647662080/-sj0LOtW_400x400.png',
          when: '7d'
        },
        {
          name: 'ACH Spain',
          info: 'Fundraiser',
          imgSrc:
            'https://assets.funraise.io/widget/client/e903bf1c-1df2-4a95-a37c-61a636c7e863/3237/1.3/6d6d61bd3be7522da5756fdcad35e539d378d890.png',
          when: '2w'
        },
        {
          name: 'ComGo',
          info: 'Fundraiser',
          imgSrc: 'https://comgo.io/_nuxt/img/logo.897afa0.png',
          when: '3w'
        }
      ]
    }
  }
}
</script>
