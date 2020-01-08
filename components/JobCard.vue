<template>
  <div class="container extra-padding">
    <p v-if="orderData.to">
      For <span class="has-text-weight-bold">{{ orderData.to }}</span>
    </p>
    <div class="video-container aspect-ratio-hack video-radius-hack">
      <div
        v-video-player:myVideoPlayer="playerOptions"
        class="video-player-box"
      ></div>
    </div>
  </div>
</template>

<style>
.video-js {
  border-radius: 1rem;
}
/* This appears to be needed because the control bar (or its contents) will otherwise break out of the player. */
.video-js .vjs-control-bar {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.video-js .vjs-big-play-button {
  font-size: 4em;
  line-height: 1.5em;
  height: 1.5em;
  width: 2em;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: none;
  background-color: #333333;
  background-color: #333333a7;
  border-radius: 0.3em;
  transition: all 0.4s;
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus {
  background-color: #555555;
  background-color: #555555a7;
  transition: all 0s;
}

.extra-padding {
  padding: 1rem;
}
.video-container {
  position: relative;
  top: 0;
  left: 0;
}
.aspect-ratio-hack {
  object-fit: cover;
}
video {
  border-radius: 1rem;
}
</style>

<script>
import { isMobile } from 'mobile-device-detect'

export default {
  props: {
    orderData: Object
  },
  data: function() {
    return {
      playerOptions: {
        fluid: true,
        muted: false,
        language: 'es',
        autoplay: isMobile,
        preload: 'metadata',
        sources: [
          {
            src: this.orderData.video.url
          }
        ]
      }
    }
  }
}
</script>
