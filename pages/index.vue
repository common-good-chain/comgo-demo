<template>
  <section></section>
</template>

<script>
export default {
  fetch({ params, redirect }) {
    redirect(301, '/feed')
  }
}
</script>
