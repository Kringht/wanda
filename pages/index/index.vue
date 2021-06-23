<template>
  <view class="content">
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad() {
      uni.navigateTo({
        url: "../home/asset"
      })
    },
    methods: {

    }
  }
</script>

<style>
</style>
