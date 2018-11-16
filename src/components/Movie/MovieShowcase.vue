<template lang="pug">
  b-container
    b-row
      b-col(
        cols="6",
        md="3",
        v-for="movie in movies",
        :key="movie.imdbId")
        MoviePoster(
          :poster="movie.poster",
          :title="movie.title")
</template>

<script>
import MoviePoster from './MoviePoster.vue';

export default {
  name: 'MovieShowcase',
  props: ['movies'],
  components: {
    MoviePoster,
  },
};
</script>
