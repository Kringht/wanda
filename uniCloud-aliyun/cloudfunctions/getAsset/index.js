'use strict';
exports.main = async (event, context) => {
  // 实例化db,建立链接
  const db = uniCloud.database()
  // 获取需要操作的表格
  const collection = db.collection('wanda')
  // 实例化操作指令
  const dbCMD = db.command

  // 查询指定条件数据
  let res = await collection.where({
    asset_class: dbCMD.eq('鼠标')
  }).limit(10).orderBy('goods_state','desc').get()


  //返回数据给客户端
  return res
};
