<template lang="pug">
  b-container.p-4.bg-light(fluid)
    h1 Manage Movies
    hr
    b-row
      b-col
        h2 List&nbsp;
          b-button(
            to="/manage/add",
            variant="primary") Add
      b-col.text-right(cols="2")
        b-form-input(
          v-model="search",
          type="text",
          placeholder="Search...")

    b-table(
      responsive,
      :filter="search",
      :fields="fields",
      :items="movies")
      template(
        slot="poster",
        slot-scope="data")
        b-img(
          width="64",
          height="64",
          thumbnail,
          fluid,
          :src="data.item.poster",
          @click="showModal(data.item)")

      template(
        slot="action"
        slot-scope="data")
        b-button(
          :variant="rateIs('hate')(data.item) ? 'danger' : ''",
          size="sm",
          @click="movieAction(data.item, 'rate', 'hate')")
          font-awesome-icon(
            flip="horizontal",
            :icon="['far', 'thumbs-down']")

        b-button(
          :variant="data.item.downloaded ? 'info' : ''",
          size="sm",
          @click="movieAction(data.item, 'downloaded', true)")
          font-awesome-icon(icon="download")

        b-button(
          :variant="rateIs('like')(data.item) ? 'success' : ''",
          size="sm",
          @click="movieAction(data.item, 'rate', 'like')")
          font-awesome-icon(:icon="['far', 'thumbs-up']")

    b-modal(
      ref="imageModal",
      hide-footer,
      :title="currentMovie.title")
      .text-center
        b-img(:src="currentMovie.poster")
</template>

<script>
import db from '@/database';

export default {
  name: 'Manage',
  data() {
    return {
      movies: [],
      search: '',
      fields: [
        { key: 'poster', class: 'text-center' },
        { key: 'imdbId', sortable: true },
        { key: 'title', sortable: true },
        { key: 'year', sortable: true },
        { key: 'rate', sortable: true },
        { key: 'downloaded', sortable: true },
        { key: 'action' },
      ],
      currentMovie: {
        title: '',
        poster: '',
      },
    };
  },
  firestore() {
    return {
      movies: db.collection('movies'),
    };
  },
  methods: {
    rateIs(val) {
      return ({ rate }) => rate === val;
    },
    async movieAction(doc, field, val) {
      const ref = db.collection('movies').doc(doc.id);
      try {
        await ref.update({
          [field]: doc[field] === val ? null : val,
        });
      } catch (err) {
        this.$store.dispatch('setError', err);
      }
    },
    showModal(movie) {
      this.currentMovie = movie;
      this.$refs.imageModal.show();
    },
  },
};
</script>
