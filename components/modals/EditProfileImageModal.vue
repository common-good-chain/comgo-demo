<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="container">
        <div class="content has-text-centered">
          <p class="title is-size-4">
            Sube una nueva foto de perfil 👏
          </p>
        </div>
        <div class="container">
          <section>
            <b-field :type="fileError ? 'is-danger' : ''" :message="fileError">
              <b-upload v-model="file" name="image" accept="image/*" drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"> </b-icon>
                    </p>
                    <p>Arrastra aquí tu archivo o haz click para seleccionar</p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div v-if="file" class="tags">
              <span class="tag is-primary">
                {{ file.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile"
                ></button>
              </span>
            </div>
          </section>
        </div>
        <div class="container">
          <b-button
            class="is-fullwidth is-danger animate-on-hover"
            style="margin-top: 1rem"
            :disabled="!file"
            @click="submitForm"
            >Subir Nueva Imagen</b-button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.upload.control {
  width: 100%;
}
.upload .upload-draggable {
  width: 100%;
}
.modal-card-body {
  border-radius: 10px;
}
</style>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.apiUrl || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  props: {
    talentId: String
  },
  data() {
    return {
      loading: false,
      file: null,
      fileError: ''
    }
  },
  methods: {
    submitForm: async function() {
      if (!this.file.type.toString().includes('image')) {
        this.fileError = 'Por favor sube un archivo de imagen'
        this.file = null
        this.$buefy.toast.open({
          duration: 3000,
          message: `Por favor sube un archivo de imagen`,
          position: 'is-top',
          type: 'is-danger'
        })
        return
      }
      this.loading = true
      try {
        const fd = new FormData()
        fd.append('files', this.file, this.file.name)
        fd.append('ref', 'talent')
        fd.append('refId', this.talentId)
        fd.append('field', 'profileImg')
        await strapi.upload(fd)
        this.loading = false
        this.$parent.close()
        this.$buefy.toast.open({
          duration: 3000,
          message: `Todo bien!`,
          position: 'is-top',
          type: 'is-success'
        })
        this.$emit('profile-image-complete')
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
    },
    data() {
      this.fileError = ''
    },
    deleteDropFile() {
      this.file = null
    }
  }
}
</script>
