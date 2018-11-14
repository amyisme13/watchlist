<template lang="pug">
  b-img(
    :width="250",
    :height="370",
    thumbnail,
    fluid,
    :src="poster")
</template>

<script>
export default {
  name: 'MoviePoster',
  props: ['poster'],
};
</script>
