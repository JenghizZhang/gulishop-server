/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')

const CategoryModel = require('../models/CategoryModel')
const UserModel = require('../models/UserModel')
const TrademarkModel = require('../models/TrademarkModel')
const AttrsModel = require('../models/AttrsModel')
const GoodsModel = require('../models/GoodsModel')
const ShopCartModel = require('../models/ShopCartModel')
var { setToken } = require('../token')


var vertoken = require('../token')

// 得到路由器对象
const router = express.Router()

// 2. 登录
router.post('/api/user/passport/login', (req, res) => {
    const { account, password } = req.body
    //生成token
    // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findOne({ account, password: md5(password) })
        .then(user => {
            if (user) { // 登陆成功
                vertoken.setToken(account, password).then((token) => {
                    user._doc.token = token
                    res.send({ code: 200, message: '成功', ok: true, data: user })
                })
            } else {// 登陆失败
                res.send({ code: 201, message: '失败', ok: false, data: null, msg: '用户名或密码不正确哦~~~' })
            }
        })
        .catch(error => {
            console.error('登陆异常', error)
            res.send({ code: 201, message: '失败', ok: false, data: null, msg: '登陆异常, 请重新尝试哦~~~' })
        })
})

// 3. 首页三级分类
router.get('/api/product/getBaseCategoryList', (req, res) => {
    CategoryModel.find({})
        .then(categories => {
            res.send({ code: 200, message: '成功', ok: true, data: categories });
        })
        .catch(error => {
            console.error('获取分类列表异常', error)
            res.send({ code: 201, ok: false, msg: '获取分类列表异常, 请重新尝试' })
        })
}
)

// 4. Search搜索商品
router.post('/api/list', (req, res) => {
    GoodsModel.find({})
        .then(goods => {
            res.send({
                code: 200, ok: true, data: {
                    attrsList: [{ attrs: 1 }],
                    goodsList: goods,
                    trademarkList: [{ trade: 3 }],
                    total: 141,
                    totalPages: 15,
                    pageSize: 10,
                    pageNo: req.body.pageNo || 1
                }
            })
        })
        .catch(error => {
            res.send({ code: 201, ok: false, msg: '获取分类列表异常, 请重新尝试' })
        })
})

// 5. 获取商品详情
router.get('/api/item/:skuId?', (req, res) => {
    res.send({
        code: 200, ok: true, data: {
            skuId: req.params.skuId,
            categoryView: { a: 1 },
            skuInfo: { b: 2 },
            spuSaleAttrList: [3]
        }
    })
})

// 6. 获取购物车列表
router.get('/api/cart/cartList', (req, res) => {
    res.send({
        code: 200, ok: true,
        data: [
            {
                id: 1, isChecked: true, imgUrl: '/images/mobile01.png',
                skuName: '米家（MIJIA） 小米小白智能摄像机增强版1080p高清360度全景拍摄AI增强',
                skuPrice: 1299, skuNum: 1,
            },
            {
                id: 2, isChecked: true, imgUrl: '/images/mobile02.png',
                skuName: 'Apple iPhone 6s（A1700）64G玫瑰金色 移动通信电信4G手机',
                skuPrice: 6088, skuNum: 2,
            },
            {
                id: 3, isChecked: false, imgUrl: '/images/mobile03.png',
                skuName: 'Apple iPhone 6s（A1700）64G玫瑰金色 移动通信电信4G手机',
                skuPrice: 6088, skuNum: 1,
            },
        ]
    })
})

// 7. 添加购物车（对商品数量进行改动）
router.post('/api/cart/addToCart/:skuId/:skuNum', (req, res) => {
    let skuId = req.params.skuId
    let skuNum = req.params.skuNum
    ShopCartModel.find({ skuId })
        .then(shopCart => {
            if (shopCart.length === 0) {
                ShopCartModel.create({ skuId, skuNum })
                    .then(result => {
                        res.send({ code: 200, ok: true, msg: '添加成功' })
                    })
            } else {
                ShopCartModel.updateOne({ skuId: skuId }, { $set: { skuNum: 1 * skuNum + shopCart[0].skuNum * 1 } })
                    .then(result => {
                        res.send({ code: 200, ok: true, msg: '修改成功', num: 1 * skuNum + shopCart[0].skuNum * 1 })
                    })
            }
        })
        .catch(error => {
            res.send({ code: 201, ok: false, msg: '异常, 请重新尝试' })
        })
})

// 8. 切换商品选中状态
router.get('/api/cart/checkCart/:skuID/:isChecked', (req, res) => {
    res.send({
        code: 200, ok: true,
        data: {
            skuID: req.params.skuID,
            isChecked: req.params.isChecked
        }
    })
})

// 9. 删除购物车商品
router.delete('/api/cart/deleteCart/:skuID', (req, res) => {
    res.send({
        code: 200, ok: true,
        data: {
            skuID: req.params.skuID,
        }
    })
})

// 10. 获取订单交易信息 
router.get('/api/order/auth/trade', (req, res) => {
    res.send({ code: 200, ok: true, data: { a: '订单交易信息' } })
})

// 12. 提交订单
router.post('/api/order/auth/submitOrder', (req, res) => {
    res.send({ code: 200, ok: true, data: 71 })
})

// 16. 注册用户
router.post('/api/user/passport/register', (req, res) => {
    UserModel.create({ account: req.body.account, password: md5(req.body.password) })
        .then(() => {
            let data = { account: req.body.account, password: req.body.password }
            vertoken.setToken(req.body.account, req.body.password).then((token) => {
                data.token = token
                res.send({ code: 200, ok: true, data })
            })
        })
})

// 17. 根据token请求获取用户信息
router.get('/api/user/passport/auth/getUserInfo', (req, res) => {
    res.send({ code: 200, ok: true, data: req.data })
})

// 18. 获取用户收件地址
router.get('/api/user/userAddress/auth/findUserAddressList', (req, res) => {
    res.send({ code: 200, ok: true, data: ['杭州'] })
})

/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
    pageNum = pageNum * 1
    pageSize = pageSize * 1
    const total = arr.length
    const pages = Math.floor((total + pageSize - 1) / pageSize)
    const start = pageSize * (pageNum - 1)
    const end = start + pageSize <= total ? start + pageSize : total
    const list = []
    for (var i = start; i < end; i++) {
        list.push(arr[i])
    }

    return {
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}

module.exports = router