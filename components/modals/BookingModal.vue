<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div v-if="!orderComplete" class="container">
        <div class="content">
          <p class="title is-size-4">
            Contrata un flik de {{ talentData.name }} 👏
          </p>
          <div class="container">
            <div class="field">
              <label class="label">¿Para quién es este video?</label>
              <b-radio v-model="orderType" native-value="gift">
                Otra persona
              </b-radio>
              <b-radio v-model="orderType" native-value="self">
                Para mí
              </b-radio>
            </div>
            <div class="columns">
              <b-field
                label="Para:"
                class="column is-6"
                :type="receiverError ? 'is-danger' : ''"
                :message="receiverError"
              >
                <b-input
                  v-model="receiver"
                  type="text"
                  placeholder="Myriam"
                  maxlength="20"
                  @focus="receiverError = ''"
                />
              </b-field>
              <b-field
                label="De:"
                class="column is-6"
                :type="emitterError ? 'is-danger' : ''"
                :message="emitterError"
              >
                <b-input
                  v-model="emitter"
                  type="text"
                  placeholder="Ignacio"
                  maxlength="20"
                  :disabled="orderType === 'self'"
                  @focus="emitterError = ''"
                />
              </b-field>
            </div>
            <b-field
              :label="'Instrucciones para ' + talentData.name"
              style="margin-top: -2rem"
              :type="instructionsError ? 'is-danger' : ''"
              :message="instructionsError"
            >
              <b-input
                v-model="instructions"
                type="textarea"
                placeholder="Hola! Mañana es el cumple de mi novia Myriam, cumple 25. Es una gran fan! Sus amigas la llaman Myr. Gracias!"
                maxlength="250"
                @focus="instructionsError = ''"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="container" style="margin-top: -1rem">
          <p class="subtitle is-size-4">
            Información de envío 📩
          </p>
          <div class="columns">
            <b-field
              label="Correo electrónico"
              class="column is-6"
              :type="emailError ? 'is-danger' : ''"
              :message="emailError"
            >
              <b-input
                v-model="email"
                type="email"
                placeholder="myriam@gmail.com"
                maxlength="50"
                @focus="
                  emailError = ''
                  emailConfirmError = ''
                "
              />
            </b-field>
            <b-field
              label="Confirma correo"
              class="column is-6"
              :type="emailConfirmError ? 'is-danger' : ''"
              :message="emailConfirmError"
            >
              <b-input
                v-model="emailConfirm"
                type="email"
                placeholder="myriam@gmail.com"
                maxlength="50"
                @focus="
                  emailError = ''
                  emailConfirmError = ''
                "
              />
            </b-field>
          </div>
          <div class="field" style="margin-top: -2rem;">
            <b-checkbox v-model="gdprAccept"
              >Acepto recibir correos de flik</b-checkbox
            >
          </div>
          <div class="field">
            <b-checkbox v-model="isPublic">Haz este flik público</b-checkbox>
          </div>
        </div>
        <br />
        <div class="container">
          <p class="subtitle is-size-4">
            Información de pago 💳
          </p>
          <div class="columns">
            <b-field label="Tarjeta" class="column is-12">
              <card
                class="stripe-card"
                stripe="pk_test_aqCcV2EIeynXomjsKg0Yqx2M00ZIPXYSq1"
                @change="creditCardComplete = $event.complete"
              />
            </b-field>
          </div>
          <br />
          <b-button
            class="is-fullwidth is-danger animate-on-hover"
            style="margin-top: -1rem"
            :disabled="!creditCardComplete"
            @click="submitForm"
            >Contrata a {{ talentData.name }} por
            {{ talentData.pricePersonalVideo }}€ ⚡</b-button
          >
          <br />
          <div class="content has-text-centered">
            <p class="is-small has-text-grey-light is-red">
              No se cargará el pago hasta que el vídeo esté enviado
            </p>
          </div>
        </div>
      </div>
      <div v-else class="container extra-padding">
        <div class="content is-medium has-text-centered">
          <h2>¡Gracias!</h2>
          <p class="has-text-left">
            Tu pedido se ha procesado con éxito. Hemos enviado los datos del
            pedido a
            <b>{{ email }}</b
            >. Ya hemos avisado a {{ talentData.name }}. Recibirás tu saludo en
            los próximos dias.
          </p>
          <h2>😘🤗👍</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.extra-padding {
  padding: 2rem;
}
.modal-card-body {
  border-radius: 10px;
}
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-color: #dbdbdb;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Card
  },
  props: {
    talentData: Object
  },
  data() {
    return {
      loading: false,
      orderType: 'gift',
      receiver: '',
      emitter: '',
      instructions: '',
      email: '',
      emailConfirm: '',
      gdprAccept: false,
      isPublic: false,
      receiverError: '',
      emitterError: '',
      instructionsError: '',
      emailError: '',
      emailConfirmError: '',
      creditCardComplete: false,
      orderComplete: false
    }
  },
  methods: {
    submitForm: async function() {
      if (!this.validateForm()) return
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        this.$buefy.toast.open({
          duration: 3000,
          message: `Ha ocurrido un error. Por favor inténtalo más tarde.`,
          position: 'is-top',
          type: 'is-danger'
        })
        this.loading = false
      }
      try {
        const order = await strapi.createEntry('orders', {
          talentId: this.talentData.id,
          orderType: this.orderType,
          receiver: this.receiver,
          emitter: this.emitter,
          instructions: this.instructions,
          email: this.email,
          isPublic: this.isPublic,
          charity: this.talentData.charity.id,
          charityPercent:
            this.talentData.charityPercent * this.talentData.isCharitable,
          token
        })
        this.$buefy.toast.open({
          duration: 3000,
          message: `Todo bien!`,
          position: 'is-top',
          type: 'is-success'
        })
        this.loading = false
        this.$router.push({ name: 'order-id', params: { id: order._id } })
      } catch (err) {
        this.loading = false
        this.$buefy.toast.open({
          duration: 3000,
          message: `Ha ocurrido un error. Por favor inténtalo más tarde.`,
          position: 'is-top',
          type: 'is-danger'
        })
      }
    },
    validateForm: function() {
      if (!this.receiver) this.receiverError = 'Este campo es obligatorio'
      if (!this.emitter && this.orderType === 'gift') {
        this.emitterError = 'Este campo es obligatorio'
      }
      if (!this.instructions) {
        this.instructionsError = 'Este campo es obligatorio'
      }
      if (!this.email) {
        this.emailError = 'Este campo es obligatorio'
      }
      if (!this.emailConfirm) {
        this.emailConfirmError = 'Este campo es obligatorio'
      }
      if (this.email !== this.emailConfirm) {
        this.emailError = 'Los emails no son los mismos'
        this.emailConfirmError = 'Los emails no son los mismos'
      }
      if (!this.gdprAccept) {
        this.$buefy.toast.open({
          duration: 3000,
          message: `Debes aceptar recibir correos para que enviemos tu video`,
          position: 'is-top',
          type: 'is-danger'
        })
      }
      if (
        !this.receiverError &&
        !this.emitterError &&
        !this.instructionsError &&
        !this.emailError &&
        !this.emailConfirmError &&
        this.gdprAccept &&
        this.creditCardComplete
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
