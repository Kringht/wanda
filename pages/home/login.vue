<template>
  <view class="context">
    <view class="">
      <button type="default" success @click="test">按 钮</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      test() {
        uni.scanCode({
          onlyFromCamera: true,
          scanType: ['qrCode'],
          success: res => {
            console.log(res)
          },
          fail: err => {
            console.log('调用失败：', err)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .context {
    display: flex;
    flex-direction: column;
  }
</style>
