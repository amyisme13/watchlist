<template lang="pug">
  b-navbar(
    toggleable="md",
    type="dark",
    variant="dark")
    b-navbar-toggle(target="nav_collapse")
    b-navbar-brand(href="#!") Watch List
    b-collapse(
      is-nav,
      id="nav_collapse")
      b-navbar-nav.ml-auto
        b-nav-item-dropdown(
          v-if="user",
          right)
          template(slot="button-content") {{ user.name }}
          b-dropdown-item(@click="signOut") Sign Out

        SignInButton(
          v-else,
          @signIn="signIn",
          :loading="loading")
</template>

<script>
import SignInButton from '@/components/User/SignInButton.vue';

export default {
  name: 'AppNavbar',
  components: {
    SignInButton,
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    signIn() {
      this.$store.dispatch('signUserInGoogle');
    },
    signOut() {
      this.$store.dispatch('signOut');
    },
  },
};
</script>
