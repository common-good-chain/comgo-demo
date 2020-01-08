<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
      <div class="container">
        <div class="content has-text-centered">
          <p class="title is-size-4">
            Sube un vídeo para {{ orderData.to }} 👏
          </p>
          <p class="is-size-5">
            <span class="has-text-weight-bold">{{ orderData.to }}</span> dice:
            <span class="is-italic">"{{ orderData.instructions }}"</span>
          </p>
        </div>
        <div class="container">
          <section>
            <b-field :type="fileError ? 'is-danger' : ''" :message="fileError">
              <b-upload
                v-model="file"
                name="video"
                accept="video/mp4"
                drag-drop
              >
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
            >Enviar Vídeo</b-button
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
    orderData: Object
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
      if (!this.file.type.toString().includes('video')) {
        this.fileError = 'Por favor sube un archivo de vídeo'
        this.file = null
        this.$buefy.toast.open({
          duration: 3000,
          message: `Por favor sube un archivo de video`,
          position: 'is-top',
          type: 'is-danger'
        })
        return
      }
      this.loading = true
      try {
        const fd = new FormData()
        fd.append('files', this.file, this.file.name)
        fd.append('ref', 'order')
        fd.append('refId', this.orderData.id)
        fd.append('field', 'video')
        await strapi.upload(fd)
        await strapi.updateEntry('orders', this.orderData.id, {
          isFulfilled: true
        })
        this.loading = false
        this.$parent.close()
        this.$emit('order-complete')
        this.$buefy.toast.open({
          duration: 3000,
          message: `Todo bien!`,
          position: 'is-top',
          type: 'is-success'
        })
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
