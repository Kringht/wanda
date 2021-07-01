'use strict';
exports.main = async (event, context) => {
  // 实例化db,建立链接
  const db = uniCloud.database()
  // 获取需要操作的表格
  const collection = db.collection('wanda')
  // 实例化操作指令
  const dbCMD = db.command
  // console.log('接收到的event值：', typeof(event.list) )
  // 查询指定条件数据
  let res
  // 如果接收多个参数
  if (typeof(event.list) == 'object') {
    res = await collection.where({
      asset_type: dbCMD.eq(event.list[0]),
      asset_class: dbCMD.eq(event.list[1])
    }).orderBy('goods_state', 'desc').get()
  } else {
    res = await collection.where({
      asset_class: dbCMD.eq(event.list)
    }).orderBy('goods_state', 'desc').get()
  }
  //返回数据给客户端
  return res
};
