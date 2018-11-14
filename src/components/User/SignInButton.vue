<template lang="pug">
  b-button(
    variant="danger",
    :disabled="loading",
    @click="$emit('signIn')")
    font-awesome-icon(:icon="['fab', 'google']")
</template>

<script>
export default {
  name: 'SignInButton',
  props: ['loading'],
};
</script>
