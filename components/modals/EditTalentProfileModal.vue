<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <b-field label="Nombre">
              <b-input
                ref="nameInput"
                v-model="newTalentData.name"
                type="name"
                placeholder="Ana Obregón"
                maxlength="50"
                required
                :validation-message="formValidation.errors.nameError"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field label="Ocupación">
              <b-input
                ref="nameInput"
                v-model="newTalentData.occupation"
                type="name"
                placeholder="Ana Obregón"
                maxlength="50"
                required
                :validation-message="formValidation.errors.occupationError"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <b-field label="Precio (€)">
              <b-input
                ref="nFollowersInput"
                v-model="newTalentData.pricePersonalVideo"
                type="number"
                placeholder="100000"
                required
                min="0"
                max="5000"
                :validation-message="formValidation.errors.priceError"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field label="Donar 5% a ONGs">
              <b-switch v-model="newTalentData.isCharitable">
                <p>{{ newTalentData.isCharitable ? 'Sí' : 'No' }}</p>
              </b-switch>
            </b-field>
          </div>
        </div>
        <b-field label="Descripción">
          <b-input
            v-model="newTalentData.description"
            type="textarea"
            placeholder="Hola! Mañana es el cumple de mi novia Myriam, cumple 25. Es una gran fan! Sus amigas la llaman Myr. Gracias!"
            maxlength="350"
            :validation-message="formValidation.errors.descriptionError"
          ></b-input>
        </b-field>
        <b-button
          class="is-fullwidth is-danger animate-on-hover"
          style="margin-top: -1rem"
          :disabled="haveThereBeenChanges"
          @click="submitForm"
          >Guardar Cambios</b-button
        >
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
</style>

<script>
import _ from 'lodash'
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  props: {
    talentData: Object
  },
  data() {
    return {
      loading: false,
      newTalentData: { ...this.talentData },
      formValidation: {
        errors: {
          nameError: 'Este campo es obligatorio',
          occupationError: 'Este campo es obligatorio',
          priceError: 'El valor tiene que ser positivo e inferior a 5000€',
          descriptionError: 'Este campo es obligatorio'
        }
      }
    }
  },
  computed: {
    isFormValid() {
      return _.every(this.$refs, ['isValid', true])
    },
    haveThereBeenChanges() {
      return _.isEqual(this.talentData, this.newTalentData)
    }
  },
  methods: {
    submitForm: async function() {
      this.$emit('update-data', this.newTalentData)
      if (!this.isFormValid) return
      this.loading = true
      try {
        await strapi.updateEntry('talents', this.newTalentData.id, {
          description: this.newTalentData.description,
          isCharitable: this.newTalentData.isCharitable,
          name: this.newTalentData.name,
          occupation: this.newTalentData.occupation,
          pricePersonalVideo: this.newTalentData.pricePersonalVideo
        })
        this.$buefy.toast.open({
          duration: 3000,
          message: `Todo bien!`,
          position: 'is-top',
          type: 'is-success'
        })
        this.loading = false
        this.$parent.close()
      } catch (err) {
        console.error(err)
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
