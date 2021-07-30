// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const goodsSchema = new mongoose.Schema({
  id: { type: Number, default: null },
  defaultImg: { type: String, default: null },
  title: { type: String, default: null },
  price: { type: Number, default: null },
  createTime: { type: Number, default: Date.now },
  tmId: { type: Number, default: null },
  tmName: { type: String, default: null },
  category1Id: { type: String, default: null },
  category2Id: { type: String, default: null },
  category3Id: { type: String, default: null },
  category1Name: { type: String, default: null },
  category2Name: { type: String, default: null },
  category3Name: { type: String, default: null },
  hotScore: { type: Number, default: null },
  attrs: { type: Object, default: null },
})


// 3. 定义Model(与集合对应, 可以操作集合)
const ProductModel = mongoose.model('goods', goodsSchema)

// 4. 向外暴露Model
module.exports = ProductModel