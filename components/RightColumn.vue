<template>
  <div class="column is-3" style="height:90vh; position: sticky; top: -30rem;">
    <div class="container">
      <!-- <div class="level">
        <div class="content">
          <p class="title is-4" style="padding-top: 0.75rem;">Categorías</p>
        </div>
      </div> -->
      <div class="container">
        <!-- <user-card></user-card> -->
        <filters-menu
          class="is-hidden-mobile"
          @filters-change="onChange"
        ></filters-menu>
        <recommendations></recommendations>
        <events></events>
        <div class="container">
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
  </div>
</template>

<style></style>

<script>
import FiltersMenu from '~/components/FiltersMenu'
import Recommendations from '~/components/Recommendations'
import Events from '~/components/Events'

export default {
  components: {
    FiltersMenu,
    Recommendations,
    Events
  },
  methods: {
    onChange: function(data) {
      this.$emit('filters-change', data)
    }
  }
}
</script>
