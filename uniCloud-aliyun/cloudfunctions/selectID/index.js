'use strict';
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // {"asset_id":"60be0630ce4325fead08a992"}
  console.log('event : ', event)
  // 实例化db，建立连接
  const db = uniCloud.database()
  // 实例化 需要查询的表格
  const collection = db.collection('wanda')
  // 实例化 操作指令
  const dbCMD = db.command

  let res = await collection.where({
    _id: event.id
  }).get()


  //返回数据给客户端
  return res
};
