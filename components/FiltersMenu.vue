<template>
  <div class="status-card">
    <div class="card">
      <div class="card-content">
        <div class="media-content" style="margin-bottom: 1rem;">
          <span class="subtitle is-5 has-text-weight-semibold">Filters</span>
        </div>
        <div class="media filters-container">
          <div class="field">
            <b-checkbox v-model="showNews">
              🚨 News
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="showEvents">
              📅 Events
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="showProjects">
              🤲 Projects
            </b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="showUpdates">
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
      showNews: true,
      showEvents: true,
      showProjects: true,
      showUpdates: true
    }
  }
}
</script>
