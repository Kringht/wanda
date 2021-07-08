<template>
  <view class="context">
    <scroll-view class="scrollView" scroll-y="true" :style="{'height':WidthHeight.height-70+'px'}">
      <view class="formView">
        <u-form :model="asset_data" refs="uForm">
          <u-form-item label="数据库ID" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data._id}}</text>
          </u-form-item>
          <u-form-item label="分 类" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_type}}</text>
          </u-form-item>
          <u-form-item label="资产编号" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data.asset_number}}</text>
          </u-form-item>
          <u-form-item label="名 称" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.asset_class" />
          </u-form-item>
          <u-form-item label="介 绍" label-width="140" label-align="center">
            <u-input cursor-spacing="30" show-confirm-bar="false" adjust-position="false" border="true" type="textarea"
              v-model="asset_data.asset_title" />
          </u-form-item>
          <u-form-item label="购买日期" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data.asset_buy_date}}</text>
          </u-form-item>
          <u-form-item label="价 格" label-width="140" label-align="center">
            <text @click='notEdit'>{{asset_data.asset_cost}} 元</text>
          </u-form-item>
          <u-form-item label="定位①" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.asset_classify_one" />
          </u-form-item>
          <u-form-item label="定位②" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.asset_classify_two" />
          </u-form-item>
          <u-form-item label="使用人" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.user" />
          </u-form-item>
          <u-form-item label="当前位置" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.now_addres" />
          </u-form-item>
          <u-form-item label="使用状态" label-width="140" label-align="center">
            <u-input border="true" v-model="asset_data.goods_state" />
          </u-form-item>
          <u-form-item label="备注" label-width="140" label-align="center">
            <view class="uinput">
              <input cursor-spacing="30" show-confirm-bar="false" adjust-position="false" border="true" type="textarea"
                v-model="asset_data.note" />
            </view>
          </u-form-item>

        </u-form>

      </view>

    </scroll-view>
    <view class="footButton">
      <u-button type="success" ripple @click="submit(asset_data)">提 交</u-button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        WidthHeight: {},
        id: '',
        asset_type: null,
        asset_type_lists: ['低值易耗', '个人笔记本', 'IT-固定资产', '家具-固定资产'],
        asset_data: null
      }
    },
    onLoad(option) {
      let that = this
      // 获取页面传过来的 对象
      that.asset_data = JSON.parse(option.asset_data)
      // 获取对象资产类型
      that.asset_type = this.asset_type_lists[this.asset_data.asset_type[1] - 1]
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

    },
    methods: {
      // 提交
      submit() {
        let data = this.asset_data
        // 调用云函数,更新数据库数据
        uniCloud.callFunction({
          name: 'UpdateID',
          data: {
            data
          },
          success: res => {
            console.log('UpdateID 云函数调用成功，更新', res, '条记录')
            if (res.result.updated == 1) {
              // 更新完成,关闭当前页面，跳转到上一页面
              uni.reLaunch({
                url: '../home/asset?res=' + JSON.stringify(res)
              })
            } else {
              // 无数据更新,关闭窗口
              uni.navigateBack({
                delta: 1
              })
            }
          },
          fail: err => {
            console.log('云函数调用失败', err)
          }
        })
      },
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

<style scoped>
  .context {
    height: 100%;
    width: 100%;
  }

  .formView {
    display: flex;
    flex-direction: row;
  }
  .uinput{
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 7px;
  }
  text {
    color: #909399
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
