<template>
  <section class="section is-small has-background-white-bis">
    <div class="container">
      <div class="columns is-spaced">
        <div class="column is-one-third">
          <div class="content">
            <h2 class="is-size-2">Reacciones 🤗</h2>
            <p class="is-size-5 has-text-weight-light">
              Menciónanos en instagram en tu post
              <span class="has-text-danger has-text-weight-medium"
                >@letflik.insta</span
              >
            </p>
          </div>
        </div>
        <div class="column is-half">
          <div class="content">
            <p class="is-size-5 has-text-weight-light">
              Nuestra misión es simple. Hacer feliz a la gente. Conectamos a
              cada persona con su ídolo, para que pueda disfrutar de un momento
              único e inolvidable. ❤️
            </p>
          </div>
        </div>
      </div>
      <div v-if="videos.length" class="column columns is-multiline">
        <div
          v-for="(data, index) in videos"
          :key="index"
          class="column is-12-mobile is-4-tablet is-4-desktop"
        >
          <job-card :order-data="data"></job-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import JobCard from '~/components/JobCard'

export default {
  components: {
    JobCard
  },
  data() {
    return {
      videos: [
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/oliverphilips2.m4v'
          }
        },
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/derrek+brooks+homepage+reaction.m4v'
          }
        },
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/kaneHodder2.m4v'
          }
        },
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/sonja+morgan+homepage+reaction.m4v'
          }
        },
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/james+mansfieldhomepage+reaction.m4v'
          }
        },
        {
          video: {
            url:
              'https://d3el26csp1xekx.cloudfront.net/miscellaneous/homepage+reactions+360x480/brett+gray+homepage+reaction.m4v'
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
.columns.is-spaced {
  justify-content: space-between;
}
</style>
