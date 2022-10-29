//导入express 
const express = require('express')
//创建express实例
const app = express()

//导入路由
const router =require('./router/user')
app.use('/api',router)


app.listen(3334,()=>{
  console.log('Server is running at 127.0.0.1:3334');
})