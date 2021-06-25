<template>
  <view class="context" :style="{'width':WidthHeight.width+'px','height':WidthHeight.height+'px'}">
    <!-- 表单输出 -->
    <view class="table">
      <u-table>
        <u-tr>
          <u-th>类型</u-th>
          <u-th>简称</u-th>
          <u-th>日期</u-th>
          <u-th>位置</u-th>
          <u-th>状态</u-th>
          <u-th>编辑</u-th>
        </u-tr>
        <u-tr v-for="(asset,index) in asset_data" v-model="asset_data">
          <u-td>{{asset.asset_type}}</u-td>
          <u-td>{{asset.asset_class}}</u-td>
          <u-td>{{asset.asset_acceptance_date}}</u-td>
          <u-td>{{asset.now_addres}}</u-td>
          <u-td>{{asset.goods_state}}</u-td>
          <u-td>
            <view>
              <u-icon class="search" name="search" size="38" @click="search(asset._id)" />
              <u-icon class="edit" name="edit-pen" size="38" @click="edit(asset._id)" />
            </view>
          </u-td>
        </u-tr>
      </u-table>
    </view>

    <!-- 底部查询条件 -->
    <view class="foot" :style="{'width':WidthHeight.width+'px'}">
      <view class="form">
        <text @click="select_show = true">打开选择</text>
        <u-select v-model="select_show" mode="mutil-column-auto" :list="select_list" @confirm="confirm" />
      </view>
      <view class="u-select">
        <u-button type="success" @click="getAsset" size="medium">查 询</u-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        WidthHeight: {},
        select_show: false,
        select_list: require('../js/select.js'),
        asset_data: {}
      }
    },
    onLoad() {
      let that = this
      uni.getSystemInfo({
        success: res => {
          this.WidthHeight = {
            'width': res.windowWidth,
            'height': res.windowHeight
          }
        }
      })
    },
    methods: {
      // 提交表单,查询数据库
      getAsset() {
        // 调用云函数查询数据库
        uniCloud.callFunction({
          name: "getAsset",
          data: {},
          success: res => {
            this.asset_data = res.result.data
            console.log('云函数调用成功，返回：', this.asset_data)
          },
          fail: err => {
            console.log('云函数调用失败，返回：', err)
          }
        })
      },
      // 编辑
      edit(asset_id) {
        uni.showToast({
          icon: 'none',
          title: '编辑：' + asset_id,
          duration: 1500
        })
      },
      // 查看
      search(asset_id) {
        uni.showToast({
          icon: 'none',
          title: '查看：' + asset_id,
          duration: 1500
        })
      },
      confirm(e) {
        console.log(e)
      }
    }
  }
</script>


<style>
  .context {
    background: #b5ffe9;
    display: flex;
    flex-direction: column;
  }

  .foot {
    position: absolute;
    bottom: 4px;
    text-align: center;
  }

  u-td {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  u-icon {
    margin: 0 4px;
  }
</style>
