<template lang="pug">
  b-card(
    :header="`${movie.title} (${movie.year})`",
    header-tag="header",
    :img-src="movie.poster || defaultPoster",
    :img-alt="`${movie.title} poster`",
    img-top)
    b-button(
      v-if="btnLabel",
      variant="primary",
      @click="$emit('click')") {{ btnLabel }}
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['movie', 'btnLabel'],
  data() {
    return {
      defaultPoster: process.env.VUE_APP_DEFAULT_IMAGE,
    };
  },
};
</script>
