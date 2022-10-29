const express = require('express')

//创建路由
const router = express.Router()


router.post('/reguser',(req,res)=>{
  res.send('this is reguser')
})


router.post('/login',(req,res)=>{
  res.send('this is login')
})

module.exports = router