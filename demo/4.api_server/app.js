const express = require('express')
//创建一个express实例
const app = express()
//导入cors跨域中间件
const cors = require('cors')
//导入Joi中间件
const Joi = require('joi')
//需要把解析表单数据的中间件放最前面，否则得到的是undifined
app.use(express.urlencoded({extended:false}))
//注册cors跨域中间件
app.use(cors())
//导入注册登录相关的模块
const userRouter =require('./router')
//导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
//导入全局配置文件
const config = require('./config')
//导入解析Token的中间件
const {expressjwt:jwt} = require('express-jwt')
//一定要在路由模块之前,封装一下res.**函数
app.use((req,res,next)=>{
  //status默认值为1,表示失败的情况
  //err的值,可能是一个错误对象，也可能是一个 错误的描述字符串
  res.cc= (err,status=1)=>{
    res.send({
      status,
      message:err instanceof Error ? err.message : err,
    })
  }
  next()
})

//在app.js中注册路由之前，配置解析Token的中间件
app.use(jwt({secret:config.jwtSecretKey,algorithms:["HS256"]}).unless({path:[/^\/api\//]}))

//注册登录注册相关的路由模块
app.use('/api',userRouter)
//注册用户信息相关的路由模块
app.use('/my',userinfoRouter)


//要定义在路由模块后面
app.use((err,req,res,next)=>{
  if(err instanceof Joi.ValidationError){
    //验证失败导致的错误
    return res.cc(err)
  }
  //身份认证失败
  if(err.name === 'UnauthorizedError'){
    return res.cc('身份认证失败')
  }
    //未知的错误
  res.cc(err)
})




app.listen(3333,()=>{
  console.log('Server is running at 127.0.0.1:3333');
})