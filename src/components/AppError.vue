<template lang="pug">
  b-alert(
    v-if="error",
    :show="!!error",
    variant="danger",
    dismissible,
    @dismissed="dismiss") {{ error.message }}
</template>

<script>
export default {
  name: 'AppError',
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    dismiss() {
      this.$store.dispatch('clearError');
    },
  },
};
</script>
