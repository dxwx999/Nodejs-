const exprss = require('express')
const router = exprss.Router()
const router_handler = require('../router_handler')



//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证规则对象
const {reg_login_schema} = require('../schema/user.js')


//注册新用户
//在注册新用户的路由中，局部声明中间件，对当前请求中携带的数据进行验证
//数据验证通过后，会把这次请求流转给后面的路由处理函数
//数据验证失败后，终止后续代码的执行，并抛出一个全局的Error错误，进入全局错误级别中间件中进行处理
router.post('/reguser',expressJoi(reg_login_schema),router_handler.reguser)

router.post('/login',expressJoi(reg_login_schema),router_handler.login)

module.exports =  router