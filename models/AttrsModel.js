// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const attrsSchema = new mongoose.Schema({
  attrId: { type: Number },
  attrValueList: { type: Array },
  attrName: { type: String },
})


// 3. 定义Model(与集合对应, 可以操作集合)
const AttrsModel = mongoose.model('attrs', attrsSchema)

// 4. 向外暴露Model
module.exports = AttrsModel