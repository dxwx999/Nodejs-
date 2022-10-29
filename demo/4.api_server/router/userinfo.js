const express = require('express')
//创建一个路由实例
const router = express.Router()
//导入用户信息路由处理欧模块
const userinfo_handler = require('../router_handler/userinfo')

//导入验证数据的包
const expressjoi = require('@escook/express-joi')

//解构出需要的验证规则
const {update_userinfo_schema,update_userpwd_schema,upodate_userpic_schema} = require('../schema/user')

//获取用户信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo)

//更新用户信息的路由
router.post('/userinfo',expressjoi(update_userinfo_schema),userinfo_handler.updateUserinfo)

//修改密码的路由
router.post('/updatepwd',expressjoi(update_userpwd_schema),userinfo_handler.updateUserPwd)

//更新用户头像
router.post('/updateavater',expressjoi(upodate_userpic_schema),userinfo_handler.updateUserAvater)

module.exports = router