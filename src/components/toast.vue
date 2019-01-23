<template>
  <div class="toast">
    {{ message }}
  </div>
</template>

<!-- Use https://materializecss.com/toasts.html CSS rules -->
<style>
    .toast {
    border-radius: 2px;
    top: 35px;
    width: auto;
    margin-top: 10px;
    position: relative;
    max-width: 100%;
    height: auto;
    min-height: 48px;
    line-height: 1.5em;
    background-color: #323232;
    padding: 10px 25px;
    font-size: 1.1rem;
    font-weight: 300;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    cursor: default
}
</style>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: null
    }
  }
}
</script>
