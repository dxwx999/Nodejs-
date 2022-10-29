# 大事件项目api_server

## 1.初始化

### 1.1创建项目

```js
npm init -y //初始化项目管理包文件
npm install express //就是一个npm 上的第三方包，提供了快速创建Web 服务器的便捷方法
```



### 1.2配置cors跨域

```js
npm install cors  //安装一个cors包，用于解决跨域wen'ti
//导入cors中间件
const cors = require('cors')
//将cors注册为全局中间件
app.use(cors())
```



### 1.3配置解析表单数据的中间件

1.通过如下的代码，配置解析 application/x-www-form-urlencoded格式的表单数据的中间件

```js
//配置解析表单数据的中间件，这个中间件只能解析 application/x-www-form-urlencoded类型的数据
app.use(express.urlencoded({extended:false}))
```

### 1.4初始化路由相关的文件夹

1.在项目根目录中，新建router文件夹，用来存放所有的路由模块

> 路由模块中，只存放客户端的请求与处理函数之间的映射关系

2.在项目根目录中，新建router_handler文件夹，用来存放所有的路由处理函数模块

> 路由处理函数模块中，专门负责存放每个路由对应的处理函数

### 1.5初始化用户路由模块

1.在router文件夹，新建user.js文件，作为用户的路由模块，并初始化代码如下:

```js
const express = require('express')
const router = express.Router()

//注册新用户
router.post('/reguser',(req,res)=>{
  res.send('reguser Ok!')
})

//登录
router.post('/login',(req,res)=>{
  res.send('login Ok!')
})


//将路由对象共享出去
module.exports = router
```

2.在app.js中，导入并使用用户路由模块:

```js
//在app.js中，导入并使用 用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
```



### 1.6抽离用户路由模块中的处理函数

> 目的:为了保证 路由模块 的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中

1.在 /router_handler/user.js中，使用exports 对象，分别向外共享如下两个路由处理函数

```js
/**
 * 在这里定义和用户相关的路由处理函数，供/router/user.js 模块进行调用
 */

//注册用户的处理函数
exports.regUser = (req,res)=>{
  res.send('reguser Okaaa')
}

exports.login = (req,res)=>{
  res.send('login Okaaaa')
}
```

2.将/router/user.js中的代码修改为如下结构:

```js
//导入路由处理函数
const userHandler = require('../router_handler/user')

//注册新用户
router.post('/reguser',userHandler.regUser)

//登录
router.post('/login',userHandler.login)

```

## 2.登录注册

### 2.1新建ev_users表

### 2.2安装并配置mysql模块

### 2.3注册

#### 	2.3.1实现步骤

#### 	2.3.2检测表单数据是否合法

```js
exports.reguser=(req,res)=>{
  //获取客户端发送过来的用户名和密码
  const userinfo = req.body
  if(!userinfo.username||!userinfo.password){
    return res.send({status:1,message:'用户名或者密码不合法'})
  }
  console.log(userinfo);
  res.send('this is reguser')
}

exports.login=(req,res)=>{
  res.send('this is login')
}
```



#### 	2.3.3检测用户名是否被占用

```js
 //定义sql语句查询是否已经存在重复的用户名
  sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr,[userinfo.username],(err,results)=>{
    //执行SQL语句失败返回失败信息
    if(err){
      return res.send({status:1,message:err.message})
    }
    //用户名被占用返回信息
    if(results.length>0){
      return res.send({status:1,message:'用户名已经被占用，请更换其他用户名!'})
    }

    res.send('用户名可用，请继续')
  })
```



#### 	2.3.4对密码进行加密处理

> 为了保证密码的安全性，不建议在数据库以明文的形式保存用户密码，推荐对密码进行加密存储

在当前项目中，使用bcryptjs对用户密码进行加密

##### 优点 ：

①加密之后的密码，无法被逆向破解

②同一明文密码多次加密，得到的加密结果各不相同，保证了安全性

##### 安装：

①运行余下命令，安装指定版本的bcryptjs

```js
npm i bcryptjs
```

②在/router_handler/user.js中，导入bcryptjs：

```js
const bcrypt = require('bcryptjs')
```

③在注册用户的处理函数中，取人用户名可用之后，调用bcrypt.hashSync(明文密码，随机盐的的长度)方法，对用户的密码进行加密

```js
    //对密码进行加密后覆盖初始值
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
```



#### 2.3.5插入新用户

```js
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
```

### 2.6登录

##### 2.6.0实现步骤

①检测表单数据是否合法

②根据用户名查询用户的数据

③判断用户输入的密码是否正确

④生成JWT的Token字符串

##### 2.6.1检测登录表单的数据是否合法

1.将/router.user.js中登录的路由代码修改如下:

```js
//登录的路由
router.post('login',expressJoi(res_login_schema),userHandler.login)
```



##### 2.6.2根据用户名查询用户对应的数据

```js
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
    console.log(result);
    if(result.length !== 1){
      
      return res.cc('登录失败!用户名不存在')
    }
    //TODO：判断用户输入的登录密码是否与数据库的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
    if(!compareResult){
      return res.cc('登录失败!密码错误')
    }
    //TODO：在服务端生成token字符串
  

    res.send('登录成功')
  })
}
```

##### 2.6.3判断用户输入的密码是否正确

> 核心实现思路：调用bcrypt.compareSync(用户提交的密码，数据库中的密码) 方法判断是否一致

> 返回值是布尔值(true一致，false不一致)

具体的实现代码如下：

```js
//TODO：判断用户输入的登录密码是否与数据库的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
    if(!compareResult){
      return res.cc('登录失败!密码错误')
    }
```

##### 2.6.4生成JWT的token字符串

> 核心注意点:在生成Token字符串的时候，一定要剔除密码和头像

①通过ES6的高级语法，快速剔除密码和头像的值:

```js
 const user = {...result[0],password:'',user_pic:''}
```



②运行如下命令，安装生成Token字符串的包:

```js
 npm i jsonwebtoken
```



③在'/router_handler/user.js'模块的头部区域，导入jsonwebtoken包

```js
//导入Token字符串的包
const jwt = require('jsonwebtoken')
```



④创建config.js文件，向外共享加密和还原token的jwtSecretKey包

```js
module.exports={
    jwtSecretKey:'dxwx954^_^_^'
}
```



⑤将用户信息对象加密成Token字符串

```js
    //对用户的信息进行加密，生成Token字符串
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:'10h'})
```

⑥将生成的Token字符串响应给客户端

```js
    //调用res.send()将Token响应给客户端
    res.send({
      status:0,
      message:'登录成功',
      token:'Bearer '+tokenStr
    })
```

##### 2.6.5配置解析Token的中间件

①运行如下的命令，安装解析Token的中间件:

```js
npm i exrpess-jwt
```

②在app.js中注册路由之前，配置解析Token的中间件

③在app.js中的错误级别中间件里面，捕获并处理Token认证失败的错误

```js
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
```



## 3.个人中心

##### 3.2.2.优化表单数据验证

> 表达验证的原则：前端验证为辅，后端验证为主，后端永远不要相信前端提交过来的任何内容

在实际开发中，前后端都需要对表单的数据进行合法性的验证，而且，后端做为数据合法性验证的最后一个关口，在拦截非法数据方面，起到了至关重要的作用



单纯地使用if...eles...的形式对数据合法性进行验证，效率低下、出错率高，维护性差，因此，推荐使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性，让后端程序员把更多的精力放再核心业务逻辑的处理上



##### 3.2.3实现更新用户基本信息的功能

```js
//定义处理规则

//导入定义验证规则的包
const joi = require('joi')


//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id =joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body:{
    username,
    password,
  }
}

//向外导出验证更新用户信息的规则对象
exports.update_userinfo_schema = {
  body:{
    id,
    nickname,
    email,
  }
}
```

```js
//定义处理函数

exports.updateUserinfo = (req,res)=>{
  const sql = `update ev_users set ? where id=?`
  db.query(sql,[req.body,req.body.id],(err,result)=>{
    //执行SQL语句失败
    if(err) return res.cc(err)
    console.log(result.affectedRows);
    //执行SQL语句成功，但是影响行数不为1
    if(result.affectedRows!==1)return res.cc('更新用户信息失败')
    //修改用户信息成功
    return res.cc('修改用户信息成功',0)
  })
}
```

```js
//导入验证数据的包
const expressjoi = require('@escook/express-joi')

//解构出需要的验证规则
const {update_userinfo_schema} = require('../schema/user')

//导入用户信息路由处理欧模块
const userinfo_handler = require('../router_handler/userinfo')

//更新用户信息的路由，使用处理规则和处理函数
router.post('/userinfo',expressjoi(update_userinfo_schema),userinfo_handler.updateUserinfo)
```

