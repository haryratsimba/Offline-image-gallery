<template>
  <div id="toasts-container">
    <toast
      v-for="(toastMessage, i) in toastMessages"
      :key="i"
      :message="toastMessage.message"
      :class="toastMessage.color"
    />
  </div>
</template>

<style>
  #toasts-container {
    display: block;
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<script>
import Toast from '@/components/toast'

import store from '@/store/'

export default {
  name: 'ToastsContainer',
  components: {
    Toast
  },
  data () {
    return {
      toastMessages: store.state.toastMessages
    }
  }
}
</script>
