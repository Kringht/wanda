'use strict';
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event)
  const db = uniCloud.database()

  const collection = db.collection('wanda_user')

  const dbCMD = db.command

  let res = await collection.where({
    phone: dbCMD.eq(event.phone)
  }).get()

  //返回数据给客户端
  return res
};
