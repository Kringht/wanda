<template>
  <view class="container">
    <view class="u-title">
      <image class="qrimg" :src="qrImg"></image>
    </view>
    <view class="main">
      <view class="u-input" :style="{'width':width*0.8+'px'}">
        <u-input class="uinput" type="number" value="getPhone" v-model="getPhone" border="border"
          placeholder="请输入手机号" />
        <u-line :color="phoneState ? '#19be6b' : '#ff9900'" direction="row" length="100%" hair-line="true" />
      </view>
      <view class="u-button" :style="{'width':width*0.8+'px'}">
        <u-button class="ubutton" type="success" shape="circle" :ripple="true" @click="createCode">确 定</u-button>
      </view>
    </view>

  </view>
</template>

<script>
  // 二维码 插件
  import QR from "../components/qrcode/wxqrcode.js"
  export default {
    data() {
      return {
        width: 0,
        qrImg: '',
        phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        phoneState: 0,
        getPhone: ''
      }
    },
    onLoad() {
      let that = this
      uni.getSystemInfo({
        success: (res) => {
          that.width = res.windowWidth
        }
      })
    },
    methods: {
      // 二维码传参生成
      createCode(phone) {
        if (this.phoneState) {
          this.qrImg = QR.createQrCodeImg('Pakpo|' + phone)
        } else {
          this.qrImg = ''
          uni.showToast({
            icon: 'none',
            title: '手机号码错误\r请重试',
            duration: 1000
          })
        }
      }
    },
    watch: {
      getPhone(old, val) {
        // 正则匹配手机号校验
        this.phoneState = this.phone.test(this.getPhone) ? 1 : 0
      }
    },
    components: {}
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .u-title {
    margin: 20px 0;
  }

  .qrimg {
    width: 260px;
    height: 260px;
  }

  .u-input {
    margin: 10px 0;
    padding: 0px;
  }

  .u-button {
    margin: 20px 0;
  }
</style>
