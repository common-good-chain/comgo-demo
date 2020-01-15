<template>
  <div class="card" data-aos="fade-up">
    <header class="card-header">
      <div class="header-content">
        <div class="poster-details">
          <span>Welcome to your </span><b>Wallet</b>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              src="https://bulma.io/images/placeholders/96x96.png"
              alt="Placeholder image"
              style="object-fit: cover; border-radius: 5px;"
            />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">@arancha.itwillbe</p>
          <p class="subtitle is-6">
            0x9cB57B5C97eAbd94205C07890BE4c1aD31E486A8
          </p>
        </div>
      </div>
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
        <a href="#">#responsive</a>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <div class="content">
          <span>Current balance:</span>
          <span class="has-text-weight-bold">7,856.85</span>
          <span class="has-text-weight-bold has-text-primary"> Cs</span>
          <span class="has-text-grey is-size-7"> (0.01btc)</span>
        </div>
      </div>
      <div class="card-footer-item">
        <b-button type="is-success" @click="displayError()">
          Request transfer
        </b-button>
        <div style="margin-right: 1rem"></div>
        <b-button type="is-danger" @click="displayError()">
          Make transfer
        </b-button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
img.aspect-ratio-hack {
  object-fit: cover;
}
img.border-hack {
  border-radius: 10px 10px 0 0;
}
.card {
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.right-content {
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  props: ['data'],
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
