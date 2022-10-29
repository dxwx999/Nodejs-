const express = require('express')
const app = express()

//TODO_01 请配置Session中间件
//1.导入 seesion中间件
var session = require('express-session')

app.use(session({
  secret:'abc cat',
  resave:false,
  saveUninitialized:true
}))

//托管静态页面
app.use(express.static('./pages'))

//解析