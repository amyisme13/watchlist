<template lang="pug">
  b-container.p-4.bg-light(fluid)
    h1 Add Movie
    hr
    h2 Search Movie &nbsp;
      b-button(
        to="/manage",
        variant="info") Back
    b-row
      b-col(
        md="6",
        lg="4")
        b-input-group
          b-form-input(
            type="text",
            v-model="search")
          b-input-group-append
            b-button(
              variant="primary",
              @click="searchOmdb") Search
            b-button(
              variant="danger",
              @click="search='';imdbMovies=[]") Clear

    b-row.mt-3(v-if="!selected")
      b-col(
        v-for="movie in imdbMovies",
        cols="6",
        md="4",
        lg="2")
        MovieCard(
          :movie="movie",
          btn-label="Select",
          @click="selectMovie(movie.imdbId)")

    h2.mt-2(v-if="selected") New Movie
    b-row(v-if="selected")
      b-col(
        md="6",
        lg="4")
        b-form-group(label="Title")
          b-form-input(
            :value="`${selected.title} (${selected.year})`",
            disabled)

        b-form-group(label="Rate")
          b-form-select(v-model="selected.rate")
            option(:value="null") Not Yet Watched
            option(value="like") Like
            option(value="hate") Hate

        b-form-checkbox(v-model="selected.downloaded") Downloaded
        b-button(@click="addMovie") Add This Movie
</template>

<script>
import db from '@/database';

import MovieCard from '@/components/Movie/MovieCard.vue';

export default {
  name: 'ManageAdd',
  components: {
    MovieCard,
  },
  data() {
    return {
      search: '',
      imdbMovies: [],
      selected: null,
    };
  },
  methods: {
    async searchOmdb() {
      if (!this.search) return;

      const baseUrl = process.env.VUE_APP_OMDB_URL;
      const apiKey = process.env.VUE_APP_OMDB_KEY;
      const url = `${baseUrl}/?s=${this.search}&apikey=${apiKey}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        const movies = json.Search.slice(0, 6);
        this.imdbMovies = movies.map(movie => ({
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster === 'N/A' ? undefined : movie.Poster,
          imdbId: movie.imdbID,
          type: movie.Type,
        }));
        this.selected = null;
      } catch (err) {
        this.$store.dispatch('setError', err);
      }
    },
    async selectMovie(id) {
      if (!id) return;

      const baseUrl = process.env.VUE_APP_OMDB_URL;
      const apiKey = process.env.VUE_APP_OMDB_KEY;
      const url = `${baseUrl}/?i=${id}&apikey=${apiKey}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        this.selected = {
          title: json.Title,
          year: json.Year,
          poster: json.Poster === 'N/A' ? undefined : json.Poster,
          imdbId: json.imdbID,
          type: json.Type,
          releasedAt: new Date(json.Released).toJSON(),
          genres: json.Genre.split(', '),
          plot: json.Plot,
          imdbRating: json.imdbRating,
          imdbVotes: json.imdbVotes,
          runtime: json.Runtime,
          director: json.Director,
          writer: json.Writer,
          actors: json.Actors.split(', '),
          // not imdb
          createdAt: new Date().toJSON(),
          rate: null,
          downloaded: false,
        };
      } catch (err) {
        this.$store.dispatch('setError', err);
      }
    },
    async addMovie() {
      if (!this.selected) return;

      const movie = this.selected;
      try {
        await db.collection('movies').add(movie);
        this.selected = null;
      } catch (err) {
        this.$store.dispatch('setError', err);
      }
    },
  },
};
</script>
