// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const trademarkSchema = new mongoose.Schema({
  tmId: {type: Number },
  tmName: { type: String },
})


// 3. 定义Model(与集合对应, 可以操作集合)
const TrademarkModel = mongoose.model('trademark', trademarkSchema)

// 4. 向外暴露Model
module.exports = TrademarkModel