<template>
  <view class="context" :style="{'width':WidthHeight.width+'px','height':WidthHeight.height+'px'}">
    <!-- 表单输出 -->
    <view class="tableTitle" v-show="table_show">
      <u-table>
        <u-tr>
          <u-th>分类</u-th>
          <u-th>简称</u-th>
          <u-th>日期</u-th>
          <u-th>位置</u-th>
          <u-th>状态</u-th>
          <u-th>编辑</u-th>
        </u-tr>
      </u-table>
    </view>
    <scroll-view class="table_view" :style="{'height':WidthHeight.height-84+'px'}" scroll-y="true">
      <view class="table">
        <u-table>
          <u-tr v-for="(asset,index) in asset_data" v-model="asset_data">
            <u-td>
              <view @click="search_id(asset._id)" class="utd">
                {{asset_type_lists[asset.asset_type[1]-1]}}
              </view>
            </u-td>
            <u-td>
              <view @click="search_id(asset._id)" class="utd">
                {{asset.asset_class}}
              </view>
            </u-td>
            <u-td>
              <view @click="search_id(asset._id)" class="utd">
                {{asset.asset_acceptance_date}}
              </view>
            </u-td>
            <u-td>
              <view @click="search_id(asset._id)" class="utd">
                {{asset.now_addres}}
              </view>
            </u-td>
            <u-td>
              <view @click="search_id(asset._id)" class="utd">
                {{asset.goods_state}}
              </view>
            </u-td>
            <u-td>
              <view>
                <!-- <u-icon class="search" name="search" size="38" @click="search_id(asset._id)" /> -->
                <u-icon class="edit" name="edit-pen" size="48" @click="edit(asset)" />
              </view>
            </u-td>
          </u-tr>
        </u-table>
      </view>
    </scroll-view>

    <!-- 底部查询条件 -->
    <view class="foot">
      <view class="u-select">
        <view class="uinput">
          <u-field label="简称" label-width="70" clear-size="40" trim="true" v-model="select_asset_class"
            placeholder="请输入查找名称" />
        </view>
        <view class="ubutton">
          <u-button type="success" @click="getAsset(select_asset_class)">查 询</u-button>
        </view>
      </view>
      <u-select v-model="select_show" mode="mutil-column-auto" :list="select_list.default" @confirm="confirm" />
      <!-- 详细信息弹出窗口 -->
      <view class="upopup">
        <u-popup v-model="asset_id_data_show" mode="center" width="80%">
          <text>资产编号：</text>
          <text>{{asset_id_data[0].asset_number}}</text><br />
          <text>分类：</text>
          <text>{{asset_id_data[0].asset_class}}</text><br />
          <text>名称：</text>
          <text>{{asset_id_data[0].asset_title}}</text><br />
          <text>金额：</text>
          <text>{{asset_id_data[0].asset_cost}}元</text><br />
          <text>购买日期：</text>
          <text>{{asset_id_data[0].asset_buy_date}}</text><br />
          <text>区域①：</text>
          <text>{{asset_id_data[0].asset_classify_one}}</text><br />
          <text>区域②：</text>
          <text>{{asset_id_data[0].asset_classify_two}}</text><br />
          <text>当前位置：</text>
          <text>{{asset_id_data[0].now_addres}}</text><br />
          <text>使用人：</text>
          <text>{{asset_id_data[0].user}}</text><br />
          <text>使用状态：</text>
          <text>{{asset_id_data[0].goods_state}}</text><br />
          <text>备注：</text>
          <text>{{asset_id_data[0].note}}</text><br />

        </u-popup>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        option: -1,
        WidthHeight: {},
        table_show: false,
        select_show: false,
        select_list: require('../js/select.js'),
        select_asset_class: '',
        asset_data: {},
        asset_type_lists: ['低值易耗', '个人笔记本', 'IT类', '家具类'],
        asset_id_data: null,
        asset_id_data_show: false
      }
    },
    onLoad(option) {
      let that = this
      // 获取 修改页面返回状态
      // 0:无修改数据
      // 1:有修改数据
      // data 返回修改后的数据
      if (JSON.stringify(option) != "{}") {
        let res = JSON.parse(option.res)
        console.log(res)
        that.select_asset_class = res.result.data.asset_class
        this.getAsset(res.result.data.asset_class)
      }
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
      getAsset(select_asset_class) {
        // 如果输入框值为空,则打开选择页面,选择类型查找
        if (this.select_asset_class == '') {
          // console.log('true')
          // 打开选择页面
          this.select_show = true
        } else {
          // 如果搜索框有文本,则查找搜索
          // 显示等待提示框
          this.loading()
          this.select_asset_class = select_asset_class
          this.select(select_asset_class)
        }
      },
      // 编辑
      edit(asset) {
        uni.navigateTo({
          url: '../components/editMessage?asset_data=' + JSON.stringify(asset),
          animationType: 'slide-in-top',
          animationDuration: 300,
          success: res => {
            console.log('跳转至编辑页面')
          },
          fail: err => {
            console.log('页面跳转失败：', err)
          }
        })
      },
      // ID查看
      search_id(id) {
        this.loading()
        uniCloud.callFunction({
          name: 'selectID',
          data: {
            id
          },
          success: res => {
            // 显示查询提示
            this.trueToast()
            this.asset_id_data = res.result.data
            this.asset_id_data_show = true
          },
          fail: err => {
            // 显示查询失败提示，控制台打印报错
            this.falseToast(err)
            console.log('云函数调用失败：', err)
          }
        })
      },
      // 条件查找
      select(list) {
        // 调用云函数查询数据库
        uniCloud.callFunction({
          name: "getAsset",
          data: {
            list
          },
          success: res => {
            // 显示查询提示
            this.trueToast()
            // 显示table 页面
            this.table_show = true
            this.asset_data = res.result.data
          },
          fail: err => {
            // 显示查询失败提示，控制台打印报错
            this.falseToast(err)
            console.log('云函数调用失败，返回：', err)
          }
        })
      },
      // 选择页面
      confirm(e) {
        let list = []
        for (let i of e) {
          // 获取选择的目录
          if (i.value != null) {
            list.push(i.value)
          }
        }
        // 显示等待提示框
        this.loading()
        // 调用查询方法
        this.select_asset_class = list[1]
        this.select(list)
      },
      // 显示等待提示框
      loading() {
        uni.showToast({
          icon: 'loading',
          title: '正在查询',
          duration: 1000
        })
      },
      // 失败提示框
      trueToast() {
        uni.showToast({
          icon: 'none',
          title: '查询完成',
          duration: 500
        })
      },
      // 成功提示框
      falseToast(err) {
        uni.showToast({
          icon: 'none',
          title: '查询失败，请联系管理员！' + err,
          duration: 1000
        })
      }

    },
    watch: {
      option(val, old) {
        console.log(this.option)
        // 如果数据有更新,重新调用查询方法 更新缓存数据
        if (val == 1) {
          // 调用点击时间,重新加载数据
          this.getAsset()
        }
        if (val == 0) {
          uni.showToast({
            icon: 'none',
            title: '未修改任何数据',
            duration: 800
          })
        }
      }
    }
  }
</script>


<style>
  .context {
    display: flex;
    flex-direction: column;
  }

  .foot {
    /* 查询条件选择部分,绝对定位在底部 */
    position: absolute;
    bottom: 4px;
    width: 100%;
  }

  .utd {
    padding: 7px;
    margin: 0px;
  }

  u-td {
    /* 文字居中 */
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  .u-select {
    width: 100%;
    position: relative;
    float: left;
    text-align: center;
  }

  .uinput {
    float: left;
    width: 65%;
  }

  .ubutton {
    float: right;
    width: 30%;
    margin-right: 5%;
  }

  u-icon {
    margin: 0 4px;
  }
</style>
