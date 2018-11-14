<template lang="pug">
  #app
    AppNavbar
    AppError
    router-view
</template>
<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppError from '@/components/AppError.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppError,
  },
};
</script>
