<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <div class="container">
        <form @keydown.enter.prevent="submitForm">
          <div class="content">
            <p class="title is-size-4">
              Transfer settings
            </p>
            <div class="container">
              <div class="columns">
                <b-field label="Handle" class="column is-6">
                  <b-input
                    ref="recipientInput"
                    v-model="recipient"
                    required
                    placeholder="@recipient"
                    maxlength="50"
                  />
                </b-field>
                <b-field label="Amount in Comgos" class="column is-6">
                  <b-numberinput
                    ref="amountInput"
                    v-model="amount"
                    required
                    placeholder="1200"
                    maxlength="20"
                  />
                </b-field>
              </div>
            </div>
          </div>
          <br />
          <div class="container">
            <b-button
              class="is-fullwidth is-primary animate-on-hover"
              style="margin-top: -1rem"
              type="number"
              min="1"
              max="10000"
              :disabled="!isFormValid"
              @click="submitForm"
              >Submit
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
export default {
  data: function() {
    return {
      amount: 0,
      recipient: ''
    }
  },
  computed: {
    isFormValid() {
      if (this.amount && this.recipient) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    submitForm: function() {
      try {
        this.$buefy.toast.open({
          duration: 3000,
          message: `Success!`,
          position: 'is-top',
          type: 'is-success'
        })
        this.$parent.close()
      } catch (err) {
        this.loading = false
        this.$buefy.toast.open({
          duration: 3000,
          message: err.message,
          position: 'is-top',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
