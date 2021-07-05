<template>
  <view class="context">
    <scroll-view class="scrollView" scroll-y="true" :style="{'height':WidthHeight.height-70+'px'}">
      <view class="formView">
        <u-form :model="asset_data">
          <u-form-item label="数据库ID" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data[0]._id}}</text>
          </u-form-item>
          <u-form-item label="分 类" label-width="140" label-align="center">
            <text>{{asset_type}}</text>
          </u-form-item>
          <u-form-item label="资产编号" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data[0].asset_number}}</text>
          </u-form-item>
          <u-form-item label="名 称" label-width="140" label-align="center">
            <text>{{asset_data[0].asset_class}}</text>
          </u-form-item>
          <u-form-item label="介 绍" label-width="140" label-align="center">
            <u-input type="textarea" v-model="asset_data[0].asset_title" />
          </u-form-item>
          <u-form-item label="价 格" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data[0].asset_cost}} 元</text>
          </u-form-item>
          <u-form-item label="定位①" label-width="140" label-align="center">
            <u-input v-model="asset_data[0].asset_classify_one" />
          </u-form-item>
          <u-form-item label="定位②" label-width="140" label-align="center">
            <u-input v-model="asset_data[0].asset_classify_two" />
          </u-form-item>
          <u-form-item label="使用人" label-width="140" label-align="center">
            <u-input v-model="asset_data[0].user" />
          </u-form-item>
          <u-form-item label="当前位置" label-width="140" label-align="center">
            <u-input v-model="asset_data[0].now_addres" />
          </u-form-item>
          <u-form-item label="使用状态" label-width="140" label-align="center">
            <u-input v-model="asset_data[0].goods_state" />
          </u-form-item>

        </u-form>

      </view>

    </scroll-view>
    <view class="footButton">
      <u-button type="success" ripple>提 交</u-button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        WidthHeight: {},
        id: '',
        asset_type: '',
        asset_type_lists: require('../js/select.js').default,
        asset_data: null,
        asset_states: ['正在使用', '未使用', '借用', '已损坏']
      }
    },
    onLoad(option) {
      let that = this
      // 获取页面传过来的 需要修改新的资产ID
      that.id = option.id
      uni.getSystemInfo({
        success: res => {
          that.WidthHeight = {
            'width': res.windowWidth,
            'height': res.windowHeight
          }
        }
      })
    },
    onReady() {
      // let id = this.id
      let id = '60be0630ce4325fead08a8fe'
      uniCloud.callFunction({
        name: 'selectID',
        data: {
          id
        },
        success: res => {
          this.asset_data = res.result.data
          // 将数据库分类转换为文字
          this.asset_type = this.asset_type_lists[this.asset_data[0].asset_type[1] - 1].label
          console.log(this.asset_type.children)
          // console.log(this.asset_data)
        },
        fail: err => {
          console.log('云函数调用失败：', err)
        }
      })
    },
    methods: {
      // 无法修改的数据,点击时提示无法修改
      notEdit() {
        uni.showToast({
          icon: 'none',
          title: '数据无法修改',
          duration: 800
        })
      }
    }
  }
</script>

<style>
  .context {
    height: 100%;
    width: 100%;
  }

  .formView {
    display: flex;
    flex-direction: row;
  }

  u-form {
    width: 100%;
  }


  .footButton {
    position: absolute;
    width: 70%;
    text-align: center;
    margin-left: 15%;
    bottom: 20px;
  }
</style>
