<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="container">
        <form method="POST" action="" @keydown.enter.prevent="submitForm">
          <div class="content">
            <p class="title is-size-4">
              Login
            </p>
            <div class="container">
              <div class="columns">
                <b-field label="Email" class="column is-6">
                  <b-input
                    ref="emailInput"
                    v-model="formValidation.fields.email"
                    type="email"
                    autocomplete="email"
                    placeholder="myriam@gmail.com"
                    maxlength="50"
                    required
                    :validation-message="formValidation.errors.emailError"
                    @focus="emailError = ''"
                  />
                </b-field>
                <b-field label="Password" class="column is-6">
                  <b-input
                    ref="passwordInput"
                    v-model="formValidation.fields.password"
                    type="password"
                    placeholder="******"
                    maxlength="20"
                    required
                    :validation-message="formValidation.errors.passwordError"
                    @focus="passwordError = ''"
                  />
                </b-field>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="field">
              <b-checkbox v-model="rememberMe">Remember Me</b-checkbox>
            </div>
          </div>
          <br />
          <div class="container">
            <b-button
              class="is-fullwidth is-danger animate-on-hover"
              style="margin-top: -1rem"
              :disabled="!isFormValid"
              type="submit"
              @click="submitForm"
              >Login
            </b-button>
            <br />
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style>
.modal-card-body {
  border-radius: 10px;
}
</style>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
import { mapMutations } from 'vuex'
import _ from 'lodash'
const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  props: {
    loginModal: Object
  },
  data() {
    return {
      loading: false,
      rememberMe: false,
      formValidation: {
        fields: {
          email: '',
          password: ''
        },
        errors: {
          emailError: 'Este campo es obligatorio, y requiere "@"',
          passwordError: 'Password field is mandatory'
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
    submitForm: async function() {
      if (
        !(
          _.every(this.$refs, ['isValid', true]) &&
          _.every(this.formValidation.fields, Boolean)
        )
      ) {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'All fields are required',
          position: 'is-top',
          type: 'is-danger'
        })
        return
      }
      this.loading = true
      try {
        this.loading = true
        const response = await strapi.login(
          this.formValidation.fields.email,
          this.formValidation.fields.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$buefy.toast.open({
          duration: 3000,
          message: `Login Successfully!`,
          position: 'is-top',
          type: 'is-success'
        })
      } catch (err) {
        this.loading = false
        this.$buefy.toast.open({
          duration: 3000,
          message: err.message,
          position: 'is-top',
          type: 'is-danger'
        })
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
