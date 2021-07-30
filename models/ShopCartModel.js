// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const shopCartSchema = new mongoose.Schema({
  skuId: { type: String },
  skuNum: { type: Number },
})


// 3. 定义Model(与集合对应, 可以操作集合)
const ShopCartModel = mongoose.model('shopCart', shopCartSchema)

// 4. 向外暴露Model
module.exports = ShopCartModel