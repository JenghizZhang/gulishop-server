/*
能操作categorys集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
  categoryName: {type: String, required: true},
  categoryId: {type: Number, required: true},
  categoryChild: {type: Array, required: false},
})

// 3. 定义Model(与集合对应, 可以操作集合)
const CategoryModel = mongoose.model('categories', categorySchema)

// 4. 向外暴露Model
module.exports = CategoryModel