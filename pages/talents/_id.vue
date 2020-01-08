<template>
  <div>
    <navbar></navbar>
    <b-modal
      v-if="talentData"
      :active.sync="isReviewsModalActive"
      has-modal-card
    >
      <reviews-modal :reviews-data="talentData.reviews"></reviews-modal>
    </b-modal>
    <b-modal
      v-if="talentData"
      :active.sync="isBookingModalActive"
      has-modal-card
    >
      <booking-modal :talent-data="talentData"></booking-modal>
    </b-modal>
    <div class="section override-top-padding">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="container">
        <div v-if="talentData" class="columns is-centered talent-container">
          <div class="column is-3">
            <figure class="image is-3by5">
              <img
                :src="talentData.profileImgSrc"
                alt="Placeholder image"
                class="aspect-ratio-hack round-image-hack"
              />
            </figure>
          </div>
          <div class="column is-6">
            <div class="media-right content">
              <div class="columns">
                <div class="column">
                  <h1 class="title">{{ talentData.name }}</h1>
                  <p class="subtitle">{{ talentData.occupation }}</p>
                </div>
                <div
                  v-if="
                    talentData.charity &&
                      talentData.isCharitable &&
                      talentData.charityPercent
                  "
                  class="column is-3"
                >
                  <b-tooltip
                    :label="
                      'Flik donará parte de los ingresos de este famoso a ' +
                        talentData.charity.displayedNameEsp
                    "
                    position="is-left"
                    multilined
                  >
                    <img
                      class="ngo-image aspect-ratio-hack"
                      :src="talentData.charity.charityImgSrc"
                    />
                  </b-tooltip>
                </div>
              </div>
              <p class="content">
                {{ talentData.description }}
              </p>
              <br />
              <b-button
                class="is-danger animate-on-hover"
                :disabled="talentData.isDisabled"
                @click="isBookingModalActive = true"
                >Contrata a {{ talentData.name }} por
                {{ talentData.pricePersonalVideo }}€ ⚡</b-button
              >
              <div v-if="talentData.isDisabled" style="margin-top: 1rem;">
                <p class="has-text-danger is-size-7">
                  Este talento no está disponible temporalmente
                </p>
              </div>
              <br />
              <hr />
              <div class="columns reviews-container">
                <div class="column is-4">
                  <div class="content">
                    <span class="title is-size-6">
                      {{ talentData.reviews.length }} Reseñas
                    </span>
                    <star-rating
                      style="margin: 0.5rem 0;"
                      :rating="computeAverageRating()"
                      :increment="0.1"
                      :read-only="true"
                      :star-size="20"
                      :rounded-corners="true"
                      text-class="subtitle is-size-6"
                    ></star-rating>
                    <a
                      v-if="talentData.reviews.length"
                      class="title has-text-link is-underlined has-text-weight-normal is-size-6"
                      @click="isReviewsModalActive = true"
                    >
                      <u>Ver más reseñas</u>
                    </a>
                  </div>
                </div>
                <div v-if="talentData.reviews.length" class="column is-9">
                  <p class="content is-size-6 is-italic">
                    "{{ talentData.reviews[0].review }}"
                  </p>
                </div>
              </div>
              <div class="columns tags-container">
                <b-taglist class="column">
                  <b-tag
                    v-for="(category, index) in talentData.categories"
                    :key="index"
                    type="is-medium"
                  >
                    <router-link
                      :to="{
                        name: 'browse-name',
                        params: { name: category.name }
                      }"
                    >
                      {{ category.displayedNameEsp }}
                    </router-link>
                  </b-tag>
                </b-taglist>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div
          v-if="talentData"
          class="columns is-centered talent-jobs-container"
        >
          <div class="column is-10 columns is-multiline">
            <div class="column is-12">
              <h2 class="title">Últimos videos</h2>
            </div>
            <div
              v-if="talentData.orders.length"
              class="column columns is-multiline"
            >
              <div
                v-for="(data, index) in talentData.orders"
                :key="index"
                class="column is-12-mobile is-4-tablet is-4-desktop"
              >
                <job-card :order-data="data"></job-card>
              </div>
            </div>
            <div v-else class="column is-12">
              <div class="box empty-state-box has-text-centered">
                <div class="content">
                  <h2 class="title is-size-4 has-text-grey">
                    {{ talentData.name }} todavía no ha hecho ningún saludo
                    público
                  </h2>
                  <p class="subtitle has-text-grey-light">
                    Dale un poco de cariño 😍🥰. ¡Se la primera persona en
                    contratar un saludo y hacerlo público!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<style>
.empty-state-box {
  padding: 3rem;
}
.override-top-padding {
  padding-top: 1rem !important;
}
img.aspect-ratio-hack {
  object-fit: cover;
}
img.ngo-image {
  max-height: 200px;
}
.round-image-hack {
  border-radius: 10px;
}
.animate-on-hover {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: all;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.animate-on-hover:hover {
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
}
</style>

<script>
import Navbar from '~/components/Navbar'
import MyFooter from '~/components/MyFooter'
import ReviewsModal from '~/components/modals/ReviewsModal'
import BookingModal from '~/components/modals/BookingModal'
import JobCard from '~/components/JobCard'

import _ from 'lodash'
import StarRating from 'vue-star-rating'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Navbar,
    MyFooter,
    ReviewsModal,
    BookingModal,
    JobCard,
    StarRating
  },
  data() {
    return {
      talentData: null,
      loading: false,
      isReviewsModalActive: false,
      isBookingModalActive: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      this.loading = true
      try {
        const response = await strapi.request('post', '/graphql', {
          data: {
            query: `query {
                      talent(id: "${this.id}") {
                        id
                        name
                        occupation
                        description
                        profileImg {
                          url
                        }
                        isDisabled
                        pricePersonalVideo
                        isCharitable
                        charityPercent
                        charity {
                          id
                          displayedNameEsp
                          charityImgSrc
                        }
                        categories {
                          name
                          displayedNameEsp
                        }
                        reviews {
                          rating
                          review
                        }
                        orders (where: {
                          isFulfilled: true,
                          isPublic: true
                        }){
                          to
                          video {
                            url
                          }
                        }
                      }
                    }
              `
          }
        })
        if (response.errors) {
          throw response.errors
        }
        this.loading = false
        response.data.talent.orders.forEach(order => {
          order.video.url = this.fetchVideo(order)
        })
        this.talentData = response.data.talent
        this.talentData.profileImgSrc = this.fetchImage(response)
      } catch (err) {
        console.error(err)
        return this.$nuxt.error({ statusCode: 404, message: err.message })
      }
    },
    fetchImage(response) {
      const path = _.get(response, 'data.talent.profileImg.url')
      if (!path) {
        return '/images/profileImgFallback.png'
      }
      const imgSrc =
        process.env.NODE_ENV === 'production' ? path : `${apiUrl}${path}`
      return imgSrc
    },
    fetchVideo(order) {
      const path = _.get(order, 'video.url')
      const videoSrc =
        process.env.NODE_ENV === 'production' ? path : `${apiUrl}${path}`
      return videoSrc
    },
    computeAverageRating() {
      return this.talentData.reviews.length
        ? _.meanBy(this.talentData.reviews, 'rating')
        : 0
    }
  }
}
</script>
