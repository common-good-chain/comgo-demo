<template>
  <div class="card" style="max-height: 300px; overflow: scroll;">
    <div class="card-content">
      <b-menu>
        <b-menu-list label="Menu">
          <b-menu-list>
            <b-menu-item
              v-if="!['wallet'].includes($route.name)"
              label="My Wallet"
              icon="credit-card"
              tag="router-link"
              :to="{ name: 'wallet' }"
              @click="displayError()"
            >
            </b-menu-item>
            <b-menu-item
              v-if="!['feed'].includes($route.name)"
              label="My Feed"
              icon="rss"
              tag="router-link"
              :to="{ name: 'feed' }"
            >
            </b-menu-item>
          </b-menu-list>
          <b-menu-item
            v-if="!['impact'].includes($route.name)"
            icon="account"
            label="My Impact"
            tag="router-link"
            :to="{ name: 'impact' }"
          ></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item label="Logout" @click="displayError()"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    displayError: function() {
      this.$buefy.toast.open({
        duration: 1500,
        message: `Ooops. This is not yet implemented`,
        position: 'is-top',
        type: 'is-warning'
      })
    }
  }
}
</script>
