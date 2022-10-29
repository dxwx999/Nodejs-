//导入db数据库模块
const db = require('../db')
//导入bcryptjs包进行对密码的加密操作
const bcrypt = require('bcryptjs')
//导入生成Token字符串的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')
//注册模块的验证
exports.reguser=(req,res)=>{
  //获取客户端发送过来的用户名和密码
  const userinfo = req.body
  // if(!userinfo.username||!userinfo.password){
  //   return res.cc('用户名或者密码不合法')
  // }
  //定义sql语句查询是否已经存在重复的用户名
  sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr,[userinfo.username],(err,results)=>{
    //执行SQL语句失败返回失败信息
    if(err){
      return res.cc(err)
    }
    //用户名被占用返回信息
    if(results.length>0){
      return res.cc('用户名已经被占用，请更换其他用户名!')
    }
    //用户名正确之后的后续操作
    //对密码进行加密后覆盖初始值
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
    

    //定义插入新用户的sql语句
    const sql = 'insert into ev_users set ?'
    //调用db.query执行sql语句
    db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
      if(err){
        return res.cc(err.message)
      }
      if(results.affectedRows !== 1){
        return res.cc('注册用户失败，请稍后再试!') 
      }

      res.cc('注册成功',0)
    })
  })
}

//登录模块的验证
exports.login=(req,res)=>{
  //接收表单的数据
  const userinfo = req.body
  //定义SQL语句
  const sql = 'select * from ev_users where username=?'
  //执行SQL语句，根据用户名查询用户的信息
  db.query(sql,userinfo.username,(err,result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.length !== 1){
      
      return res.cc('登录失败!用户名不存在')
    }
    //TODO：判断用户输入的登录密码是否与数据库的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
    if(!compareResult){
      return res.cc('登录失败!密码错误')
    }
    //TODO：在服务端生成token字符串
    
    const user = {...result[0],password:'',user_pic:''}
    //对用户的信息进行加密，生成Token字符串
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
    //调用res.send()将Token响应给客户端
    res.send({
      status:0,
      message:'登录成功',
      token:'Bearer '+tokenStr
    })
  })
}