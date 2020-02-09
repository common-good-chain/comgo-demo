<template>
  <div class="status-card">
    <div class="card">
      <div class="card-content">
        <div class="media-content" style="margin-bottom: 1rem;">
          <span class="subtitle is-5 has-text-weight-semibold"
            >Your Social Impact</span
          >
        </div>
        <div class="media" style="align-items: center;">
          <div class="media-left">
            <span class="title is-4">
              <b-tooltip label="Charity champion" type="is-dark">
                🏆
              </b-tooltip>
            </span>
          </div>
          <div class="media-content">
            <div>
              <b-progress type="is-primary" :value="80" show-value
                ><b-tooltip
                  label="You'll reach Helping Hero soon!🦸‍♀️"
                  type="is-dark"
                  >120 points
                </b-tooltip></b-progress
              >
            </div>
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
</style>
