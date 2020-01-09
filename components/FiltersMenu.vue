<template>
  <div class="status-card">
    <div class="card">
      <div class="card-content">
        <div class="media-content" style="margin-bottom: 1rem;">
          <span class="subtitle is-5 has-text-weight-semibold">Filters</span>
        </div>
        <div class="media filters-container">
          <div class="field">
            <b-checkbox v-model="filtersState.showNews" @input="onChange">
              🚨 News
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="filtersState.showEvents" @input="onChange">
              📅 Events
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="filtersState.showProjects" @input="onChange">
              🤲 Projects
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="filtersState.showUpdates" @input="onChange">
              🔔 Updates
            </b-checkbox>
          </div>
        </div>
      </div>
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
.filters-container {
  flex-direction: column;
}
</style>

<script>
export default {
  data() {
    return {
      filtersState: {
        showNews: true,
        showEvents: true,
        showProjects: true,
        showUpdates: true
      }
    }
  },
  methods: {
    onChange: function(event) {
      this.$emit('filters-change', this.filtersState)
    }
  }
}
</script>
