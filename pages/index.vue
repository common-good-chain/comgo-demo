<template>
  <section>
    <navbar></navbar>
    <section class="hero is-medium has-background">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-half">
              <div class="content">
                <h2 class="title-serif is-size-2">
                  Descubre <span class="has-text-danger">flik.</span>
                  <br class="is-hidden-widescreen-only" />
                  Regala momentos <br class="is-hidden-widescreen-only" />
                  con
                  <vue-typer
                    :text="['Mario.', 'Pepe.', 'Boris.', 'Samantha.', 'Jordi.']"
                    erase-style="backspace"
                    :erase-delay="50"
                  ></vue-typer>
                </h2>
                <p class="hello has-text-grey is-size-4">
                  Pide un saludo personalizado a tus personajes favoritos.
                </p>
                <div>
                  <b-button
                    tag="router-link"
                    class="is-medium is-danger animate-on-hover hero-button"
                    style="margin-top: 1rem"
                    :to="{
                      name: 'browse-name',
                      params: { name: 'destacados' }
                    }"
                    >Encuentra flikers 👏</b-button
                  >
                  <b-button
                    tag="router-link"
                    class="is-medium animate-on-hover hero-button"
                    style="margin-top: 1rem"
                    :to="{ name: 'enroll' }"
                    >Únete como fliker 😎</b-button
                  >
                </div>
              </div>
            </div>
            <div class="column is-1"></div>
            <div class="column is-one-third is-hidden-mobile">
              <video
                playsinline
                class="aspect-ratio-hack video-radius-hack"
                src="https://d3el26csp1xekx.cloudfront.net/v/no-wm-cSY2rE2XWB.mp4"
                autoplay
                loop
                muted
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
    <reactions></reactions>
    <my-footer></my-footer>
  </section>
</template>

<style>
.hero-button {
  margin: 10px 10px 0 0;
}
video.aspect-ratio-hack {
  object-fit: cover;
}
video.video-radius-hack {
  border-radius: 10px;
}
.vue-typer .custom.char.typed {
  color: #363636;
}
@media only screen and (min-width: 768px) {
  .has-background {
    background-image: url('/images/bg.svg');
    background-repeat: no-repeat;
    background-position: right;
  }

  .hero-body {
    margin-top: -72px;
  }
}
</style>

<script>
import Navbar from '~/components/Navbar'
import MyFooter from '~/components/MyFooter'
import Reactions from '~/components/landing/Reactions'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    MyFooter,
    Reactions
  }
}
</script>
