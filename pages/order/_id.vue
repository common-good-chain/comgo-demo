<template>
  <div>
    <navbar></navbar>
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
    <div v-if="orderData" class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8">
            <div
              v-if="!orderData.isFulfilled"
              class="content is-medium has-text-centered"
            >
              <h2>¡Gracias! 😘🤗👍</h2>
              <p>
                Tu pedido se ha procesado con éxito. Hemos enviado los datos del
                pedido a
                <b>{{ orderData.email }}</b
                >. Ya hemos avisado a {{ orderData.talent.name }}. ¡Recibirás tu
                saludo en los próximos dias!
              </p>
            </div>
            <div v-else class="content is-medium has-text-centered">
              <h2>¡Gracias! 😘🤗👍</h2>
              <p>
                {{ orderData.talent.name }} ya ha enviado tu vídeo. Lo has
                recibido en tu correo: <b>{{ orderData.email }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="orderData" class="section has-background-white-bis">
      <div class="columns is-centered">
        <div class="column is-10 columns">
          <div class="column is-half">
            <div class="box">
              <div class="content">
                <h1>Detalles del Pedido 📝</h1>
                <hr />
                <h3>Name</h3>
                <p>{{ orderData.talent.name }}</p>
                <h3>Para</h3>
                <p>{{ orderData.to }}</p>
                <h3 v-if="orderData.from">De parte de</h3>
                <p v-if="orderData.from">{{ orderData.from }}</p>
                <h3>Instrucciones</h3>
                <p>{{ orderData.instructions }}</p>
              </div>
            </div>
          </div>
          <div v-if="!orderData.isFulfilled" class="column is-half">
            <div class="content">
              <h1>¿Y ahora?🤔</h1>
              <hr />
              <h5 class="has-text-grey has-text-weight-normal">
                {{ orderData.talent.name }} tiene
                <strong>{{ daysLeft }} dias</strong> para enviar tu flik. Si no
                pudiera, se eliminará el bloqueo en la cuenta del pago.
                <br /><br />
                Una vez completado, podrás ver tu flik aquí y lo enviaremos a
                <strong>{{ orderData.email }}</strong>
              </h5>
            </div>
          </div>
          <div v-else class="column is-half">
            <div class="content">
              <h1>Aquí tienes tu flik!👏</h1>
              <h5 class="has-text-grey has-text-weight-normal">
                De parte de {{ orderData.talent.name }}, sólo para ti! Puedes
                verlo aquí y descargarlo cuando quieras. 😘
              </h5>
              <div class="container columns is-centered">
                <div class="column">
                  <video
                    playsinline
                    class="aspect-ratio-hack video-radius-hack"
                    :src="orderData.videoSrc"
                    controls
                  ></video>
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

<style scoped>
.empty-state-box {
  padding: 3rem;
}
.override-top-padding {
  padding-top: 1rem !important;
}
video.aspect-ratio-hack {
  object-fit: cover;
  max-height: 400px;
}
video.video-radius-hack {
  border-radius: 10px;
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

import _ from 'lodash'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Navbar,
    MyFooter
  },
  data() {
    return {
      orderData: null,
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    daysLeft() {
      const current = new Date()
      const previous = new Date(this.orderData.createdAt)
      const daysLeft = 8 - Math.ceil((current - previous + 1) / 86400000)
      return daysLeft < 0 ? 0 : daysLeft
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
                      order(id: "${this.id}") {
                        to
                        from
                        orderType
                        instructions
                        createdAt
                        isFulfilled
                        email
                        video {
                          url
                        }
                        talent {
                          name,
                          profileImg {
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
        this.orderData = response.data.order
        this.orderData.videoSrc = this.fetchVideo(this.orderData)
      } catch (err) {
        console.error(err)
        return this.$nuxt.error({ statusCode: 404, message: err.message })
      }
    },
    fetchVideo(order) {
      const path = _.get(order, 'video.url')
      const videoSrc =
        process.env.NODE_ENV === 'production' ? path : `${apiUrl}${path}`
      return videoSrc
    }
  }
}
</script>
