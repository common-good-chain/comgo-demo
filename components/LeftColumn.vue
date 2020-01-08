<template>
  <div class="column is-3" style="height:90vh; position: sticky; top: -15rem;">
    <div class="container">
      <!-- <div class="level">
        <div class="content">
          <p class="title is-4" style="padding-top: 0.75rem;">Categorías</p>
        </div>
      </div> -->
      <user-card></user-card>
      <social-score></social-score>
      <user-menu></user-menu>
    </div>
  </div>
</template>

<style>
.card {
  /*max-width: 260px;*/
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
</style>

<script>
import _ from 'lodash'
import { isMobile } from 'mobile-device-detect'
import UserCard from '~/components/UserCard'
import SocialScore from '~/components/SocialScore'
import UserMenu from '~/components/UserMenu'

export default {
  components: {
    UserCard,
    SocialScore,
    UserMenu
  },
  props: ['allCategories', 'selectedCategory'],
  computed: {
    isMobileDetected() {
      return isMobile
    },
    parentCategory() {
      return this.selectedCategory.parentCategory
    },
    relatedCategories() {
      let data
      const selectedCategory = this.selectedCategory
      if (this.parentCategory) {
        data = _.filter(this.allCategories, {
          parentCategory: { id: this.parentCategory.id }
        })
        _.remove(data, function(category) {
          return category.id === selectedCategory.id
        })
      } else {
        data = _.filter(this.allCategories, {
          parentCategory: { id: selectedCategory.id }
        })
      }
      return data
    },
    parentCategories() {
      return _.filter(this.allCategories, { parentCategory: null })
    }
  }
}
</script>
