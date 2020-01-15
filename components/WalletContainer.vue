<template>
  <div class="column is-9">
    <div class="container">
      <wallet-card @openModal="onOpenTransferModal()"></wallet-card>
      <div class="container" data-aos="fade-up">
        <div class="content is-6 has-text-grey-light">
          <a href="">About</a> · <a href="">Privacy policy</a> ·
          <a href="">Conditions</a> ·
          <a href="">More</a>
        </div>
        <div class="content is-7 has-text-grey-light">
          2019 © Comgo
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import WalletCard from '~/components/WalletCard'

export default {
  components: {
    WalletCard
  },
  methods: {
    onOpenTransferModal: function() {
      this.$emit('openModal', true)
    }
  }
}
</script>
