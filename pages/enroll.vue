<template>
  <div>
    <navbar></navbar>
    <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
    <div
      class="section columns is-centered"
      :class="{ 'is-medium': enrollmentComplete }"
    >
      <div class="column is-8 box is-centered extra-padding negative-margin">
        <div v-if="!enrollmentComplete" class="content">
          <p class="title is-size-4">
            Únete a flik 👏
          </p>
          <p>
            Si tienes seguidores y quires unirte a flik como talento, mándanos
            tu info y nos pondremos en contacto en breves.
          </p>
          <div class="container">
            <b-field label="Nombre">
              <b-input
                ref="nameInput"
                v-model="formValidation.fields.name"
                type="name"
                placeholder="Ana Obregón"
                maxlength="50"
                required
                :validation-message="formValidation.errors.nameError"
              ></b-input>
            </b-field>
            <b-field label="Email (nunca se comparte)">
              <b-input
                ref="emailInput"
                v-model="formValidation.fields.email"
                type="email"
                autocomplete="email"
                placeholder="aobregon@gmail.com"
                maxlength="50"
                :validation-message="formValidation.errors.emailError"
                required
              ></b-input>
            </b-field>
            <b-field label="Teléfono (nunca se comparte)">
              <b-input
                ref="phoneInput"
                v-model="formValidation.fields.phone"
                type="tel"
                pattern="^(\+34|0034|34)?[\s|\-|\.]?[6|7|8|9][\s|\-|\.]?([0-9][\s|\-|\.]?){8}$"
                placeholder="648 542 134"
                required
                :validation-message="formValidation.errors.phoneError"
              ></b-input>
            </b-field>
            <div class="columns">
              <b-field label="Tu red social más importante" class="column is-6">
                <b-select
                  ref="networkSelect"
                  placeholder="Selecciona una red"
                  required
                  expanded
                  :validation-message="formValidation.errors.networkError"
                  @input="bindSelection"
                >
                  <option value="">Selecciona</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitch">Twitch</option>
                  <option value="other">Otros</option>
                </b-select>
              </b-field>
              <b-field label="Nº de seguidores" class="column is-6">
                <b-input
                  ref="nFollowersInput"
                  v-model="formValidation.fields.nFollowers"
                  type="number"
                  placeholder="100000"
                  required
                  :validation-message="formValidation.errors.nFollowersError"
                ></b-input>
              </b-field>
            </div>
            <b-field label="Alias" style="margin-top: -1rem">
              <b-input
                ref="handleInput"
                v-model="formValidation.fields.handle"
                type="name"
                placeholder="@realanaobregon"
                maxlength="50"
                required
                :validation-message="formValidation.errors.nameError"
              ></b-input>
            </b-field>
            <b-button
              class="is-fullwidth is-danger animate-on-hover"
              style="margin-top: -1rem"
              :disabled="!isFormValid"
              @click="submitForm"
              >Únete a flik</b-button
            >
          </div>
        </div>
        <div v-else class="columns is-centered">
          <div class="content is-medium has-text-centered">
            <h2>¡Gracias!</h2>
            <p>
              Pronto nos pondremos en contacto contigo. Esperamos verte pronto
              por aquí.
            </p>
            <h2>😘🤗👍</h2>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<style>
.negative-margin {
  margin-top: -1rem !important;
}
.extra-padding {
  padding: 2rem;
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
      loading: false,
      enrollmentComplete: false,
      formValidation: {
        fields: {
          name: '',
          email: '',
          phone: '',
          network: null,
          handle: '',
          nFollowers: null
        },
        errors: {
          nameError: 'Este campo es obligatorio',
          emailError: 'Este campo es obligatorio, y requiere "@"',
          phoneError:
            'El formato no coincide. Sólo válido para móviles españoles.',
          networkError: 'Tienes que seleccionar una red',
          handleError: 'Este campo es obligatorio',
          nFollowersError: 'Por favor introduce un número, sin puntos ni comas'
        }
      }
    }
  },
  computed: {
    isFormValid() {
      return (
        _.every(this.$refs, ['isValid', true]) &&
        _.every(this.formValidation.fields, Boolean)
      )
    }
  },
  methods: {
    bindSelection: function(event) {
      this.formValidation.fields.network = event
    },
    submitForm: async function() {
      this.loading = true
      if (!this.isFormValid) {
        this.$buefy.toast.open({
          duration: 3000,
          message: `Revisa que todos los campos están completados adecuadamente`,
          position: 'is-top',
          type: 'is-danger'
        })
        return
      }
      try {
        await strapi.createEntry('talentrequests', {
          name: this.formValidation.fields.name,
          email: this.formValidation.fields.email,
          phone: this.formValidation.fields.phone,
          network: this.formValidation.fields.network,
          handle: this.formValidation.fields.handle,
          nFollowers: this.formValidation.fields.nFollowers
        })
        this.$buefy.toast.open({
          duration: 3000,
          message: `Todo bien!`,
          position: 'is-top',
          type: 'is-success'
        })
        this.loading = false
        this.enrollmentComplete = true
        setTimeout(() => {
          this.$router.push('/')
        }, 5000)
      } catch (err) {
        this.loading = false
        this.$buefy.toast.open({
          duration: 3000,
          message: `Ha ocurrido un error. Por favor inténtalo más tarde.`,
          position: 'is-top',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
