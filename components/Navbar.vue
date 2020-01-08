<template>
  <nav class="navbar is-hidden-mobile">
    <div class="container nav-content">
      <div class="nav-brand">
        <a href="/feed">
          <img class="image is-64x64" src="../static/icon.png" />
        </a>
        <div class="navbar-item logo">
          <h1 class="nav-title is-size-5 has-text-grey">com<b>go</b></h1>
        </div>
      </div>
      <div>
        <div style="display: flex; align-items: center; padding-left: 10px">
          <talent-search :all-talents="data"></talent-search>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav-brand {
  display: flex;
}
.navbar {
  box-shadow: 0 4px 13px -2px #e8e8e8;
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 9999;
}
.navbar-text {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.navbar-text:hover {
  -webkit-transform: translateY(-2px);
  transform: translateY(-2px);
}
.nuxt-link-active span {
  -webkit-box-shadow: inset 0 -6px 0 rgba(184, 107, 255, 0.2);
  box-shadow: inset 0 -6px 0 rgba(184, 107, 255, 0.2);
}
#bulma-navbar-override:hover {
  background-color: inherit;
  color: inherit;
}
</style>

<script>
import { mapMutations } from 'vuex'
import TalentSearch from '~/components/TalentSearch'

export default {
  components: {
    TalentSearch
  },
  data() {
    return {
      loading: false,
      data: [
        {
          id: 1,
          name: 'Guli',
          occupation: 'Cool Guy',
          categories: 'Blablabla'
        },
        {
          id: 2,
          name: 'Myriam',
          occupation: 'Cool Gal',
          categories: 'Blablabla'
        },
        {
          id: 3,
          name: 'Myriam 2',
          occupation: 'Cool Gal',
          categories: 'Blablabla'
        },
        {
          id: 4,
          name: 'Myriam 3',
          occupation: 'Cool Gal',
          categories: 'Blablabla'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
