<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <!-- style="justify-content: center" -->
        <figure class="image is-96x96">
          <img
            src="/images/arancha.jpeg"
            style="object-fit: cover; border-radius: 5px;"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="media-content" style="margin-bottom: 1rem;">
        <!-- has-text-centered -->
        <p class="title is-4">Arancha Martínez</p>
        <p class="subtitle is-6">
          Tackling poverty through Social Innovation • Re-thinking Philanthropy
          • 🏅 Princess Girona Award
        </p>
      </div>
      <div class="media-content">
        <b-taglist>
          <!-- style="justify-content: center" -->
          <b-tag type="is-info">🏅 Power user</b-tag>
          <b-tag type="is-primary">International</b-tag>
          <b-tag type="is-danger">Project owner</b-tag>
          <b-tag type="is-success">Coordinator</b-tag>
          <b-tag type="is-info">Moderator</b-tag>
        </b-taglist>
      </div>
    </div>
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
  /*max-width: 260px;*/
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
</style>
