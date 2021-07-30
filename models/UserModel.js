/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

// 2.字义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
  account: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  nickName: String, // 别名
  phone: String,
  token: String,
})

// 3. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('users', userSchema)

/* // 初始化默认超级管理员用户: admin/admin
UserModel.findOne({username: 'admin'}).then(user => {
  if(!user) {
    UserModel.create({
      account: 'admin', password: md5('admin'), nickName:'Adminstrator', phone:000})
            .then(user => {
              console.log('初始化用户: 用户名: admin 密码为: admin')
            })
  }
}) */

// 4. 向外暴露Model
module.exports = UserModel