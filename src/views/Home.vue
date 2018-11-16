<template lang="pug">
  b-container.p-4.bg-light(fluid)
    h1 My Watchlist
    hr
    h2 Liked
    MovieShowcase(:movies="liked")
    h2 Hated
    MovieShowcase(:movies="hated")
    h2 Followed
    MovieShowcase(:movies="followed")
</template>

<script>
import db from '@/database';

import MovieShowcase from '@/components/Movie/MovieShowcase.vue';

export default {
  name: 'Home',
  components: {
    MovieShowcase,
  },
  data() {
    return {
      movies: [],
    };
  },
  firestore() {
    return {
      movies: db.collection('movies'),
    };
  },
  computed: {
    liked() {
      return this.movies
        .filter(this.rateIs('like'))
        .sort(this.compareDateBy('createdAt', true))
        .slice(0, 4);
    },
    hated() {
      return this.movies
        .filter(this.rateIs('hate'))
        .sort(this.compareDateBy('createdAt', true))
        .slice(0, 4);
    },
    followed() {
      return this.movies
        .filter(this.rateIs(null))
        .sort(this.compareDateBy('releasedAt'))
        .slice(0, 4);
    },
  },
  methods: {
    rateIs(val) {
      return ({ rate }) => rate === val;
    },
    compareDateBy(field, desc = false) {
      return (a, b) => {
        if (desc) {
          return new Date(b[field]) - new Date(a[field]);
        }
        return new Date(a[field]) - new Date(b[field]);
      };
    },
  },
};
</script>
