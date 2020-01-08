<template>
  <router-link
    :to="{ name: 'talents-id', params: { id: talentData.id } }"
    class="card"
  >
    <div class="card-image">
      <figure class="image is-4by5">
        <img
          class="border-hack aspect-ratio-hack"
          :src="talentData.profileImgSrc"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div
      v-if="talentData.isNew && !talentData.isDisabled"
      class="top-left-tag image-tags tags"
    >
      <span class="tag is-medium is-danger">Nuevo</span>
    </div>
    <div class="top-right-tag image-tags tags">
      <span class="tag is-medium is-dark-alpha">{{
        talentData.isDisabled
          ? '🚫 No disponible'
          : talentData.pricePersonalVideo + '€'
      }}</span>
    </div>
    <div class="card-content card-content-hack">
      <div class="media">
        <div class="media-content overflow-hack">
          <p class="subtitle is-7 overflow-safety">
            {{ talentData.occupation }}
          </p>
          <p class="title is-6 overflow-safety">{{ talentData.name }}</p>
          <p class="subtitle is-7 overflow-safety">
            {{ talentData.isCharitable ? 'ONG 😇• ' : '' }}
            {{ getCategoriesAsString(talentData.categories) }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style>
img.aspect-ratio-hack {
  object-fit: cover;
}
.overflow-hack {
  width: 100%;
  overflow-y: hidden;
}
img.border-hack {
  border-radius: 10px 10px 0 0;
}
.card {
  /*max-width: 260px;*/
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 5px 14px rgba(10, 10, 10, 0.1), 0 0 0 0px rgba(10, 10, 10, 0.1);
  border-radius: 10px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: all;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.card:hover {
  box-shadow: 0 5px 14px rgba(10, 10, 10, 0.3), 0 0 0 0px rgba(10, 10, 10, 0.1);
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
  cursor: pointer;
}
.image-tags {
  position: absolute;
}
.top-left-tag {
  left: 1rem;
  top: 1rem;
}
.top-right-tag {
  right: 1rem;
  top: 1rem;
}
.bottom-right-tag {
  right: 1rem;
  bottom: 0rem;
}
.overflow-safety {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import _ from 'lodash'
export default {
  props: {
    talentData: Object
  },
  methods: {
    getCategoriesAsString(categories) {
      return _.map(categories, 'displayedNameEsp').join(' • ')
    }
  }
}
</script>
