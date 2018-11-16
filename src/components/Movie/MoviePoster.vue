<template lang="pug">
  b-img(
    :width="250",
    :height="370",
    thumbnail,
    fluid,
    :src="poster || defaultPoster",
    :alt="`${title} poster`")
</template>

<script>
export default {
  name: 'MoviePoster',
  props: ['poster', 'title'],
  data() {
    return {
      defaultPoster: process.env.VUE_APP_DEFAULT_IMAGE,
    };
  },
};
</script>
