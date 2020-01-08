<template>
  <div class="column is-2">
    <div class="container">
      <div class="level">
        <div class="content">
          <p class="title is-4" style="padding-top: 0.75rem;">Categorías</p>
        </div>
      </div>
      <div v-if="!isMobileDetected" class="container">
        <div class="category-tag category-tag--desktop selected-category">
          {{ selectedCategory.displayedNameEsp }}
        </div>
        <router-link
          v-if="parentCategory"
          :to="{ name: 'browse-name', params: { name: parentCategory.name } }"
          class="category-tag category-tag--desktop "
        >
          {{ parentCategory.displayedNameEsp }}
        </router-link>
        <router-link
          v-for="(category, index) in relatedCategories"
          :key="index"
          :to="{ name: 'browse-name', params: { name: category.name } }"
          class="category-tag category-tag--desktop "
        >
          <span>{{ category.displayedNameEsp }}</span>
        </router-link>
        <hr />
        <router-link
          v-for="(category, index) in parentCategories"
          :key="index"
          :to="{ name: 'browse-name', params: { name: category.name } }"
          class="category-tag category-tag--desktop "
        >
          <span>{{ category.displayedNameEsp }}</span>
        </router-link>
      </div>
      <div v-else class="mobile-categories-container">
        <div class="category-tag no-wrap selected-category">
          {{ selectedCategory.displayedNameEsp }}
        </div>
        <router-link
          v-if="parentCategory"
          :to="{ name: 'browse-name', params: { name: parentCategory.name } }"
          class="category-tag no-wrap"
        >
          {{ parentCategory.displayedNameEsp }}
        </router-link>
        <router-link
          v-for="(category, index) in relatedCategories"
          :key="index"
          :to="{ name: 'browse-name', params: { name: category.name } }"
          class="category-tag no-wrap"
        >
          <span>{{ category.displayedNameEsp }}</span>
        </router-link>
        <div class="vl"></div>
        <router-link
          v-for="(category, index) in parentCategories"
          :key="index"
          :to="{ name: 'browse-name', params: { name: category.name } }"
          class="category-tag no-wrap"
        >
          <span>{{ category.displayedNameEsp }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.vl {
  border-left: 6px solid #dbdbdb;
  border-radius: 4px;
  height: 2.75rem;
  margin-right: 0.75rem;
}
.mobile-categories-container {
  display: flex;
  overflow-x: auto;
}
.mobile-categories-container::-webkit-scrollbar {
  display: none;
}
.no-wrap {
  flex-shrink: 0;
}
.category-tag {
  display: flex;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 0 12px 7px 0;
  padding: 10px;
}
.category-tag:hover {
  cursor: pointer;
  background-color: #e8e8e8;
}
.category-tag.selected-category {
  background-color: #a13aff;
  color: #fff;
  display: flex;
  border-radius: 10px;
  margin: 0 12px 7px 0;
  padding: 10px;
}
.category-tag.selected-category:hover {
  background-color: #860ff3;
}
.category-tab--desktop {
  width: 100%;
}
</style>

<script>
import _ from 'lodash'
import { isMobile } from 'mobile-device-detect'

export default {
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
