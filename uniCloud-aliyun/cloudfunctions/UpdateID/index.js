'use strict';
exports.main = async (event, context) => {
  //云函数接收参数对象
  console.log(event.data)
  const db = uniCloud.database()

  const collection = db.collection('wanda')

  const dbCMD = db.command

  let res = await collection.doc(event.data._id).update({
    asset_class: event.data.asset_class,
    asset_title: event.data.asset_title,
    asset_classify_one: event.data.asset_classify_one,
    asset_classify_two: event.data.asset_classify_two,
    user: event.data.user,
    now_addres: event.data.now_addres,
    goods_state: event.data.goods_state,
    note: event.data.note

  })

  res.data = event.data

  //返回数据给客户端
  return res
};
