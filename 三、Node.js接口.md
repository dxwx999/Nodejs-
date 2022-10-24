## 使用Express写接口

#### 安装express

首先在安装express的时候遇到了问题，经过百度，发现express将命令行分离出来了

而最新express4.0+版本中将命令工具分离了出来，所以要安装express-generator，

```eng
generator 发电机;发生器;电力公司
```



执行：npm install express-generator -g

检测express：express --version

![img](https://img2018.cnblogs.com/blog/1454235/201902/1454235-20190218172313056-769792449.png)

注意我们在运行时，系统有提示“destination is not empty, continue? [y/N]”，直接输入"y"就好。这是因为我们在forms目录下创建，并且该目录下已有部分通过"npm -i"创建的项目文件。



#### 接收get和post请求

```js
//导入 express
import express from 'express'

//创建 express 的服务器实例 
const app = express()


//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
//导入路由模块
import router from './02.apiRouter.js'

//为解决跨域问题 使用cors


//把路由模块注册到app上
app.use('/api',router)

//调用app.listen方法，指定端口号并启动web服务器
app.listen(80,()=>{
  console.log('Express server running at http://127.0.0.1');
})
```

```js
//创建express
import express from 'express'

//创建服务器实例
const router = express.Router()
//在这里挂载对应的路由
router.get('/get',(req,res)=>{
  //通过req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  //调用res.send()方法，向客户端响应处理的结果
  res.send({
    statusL:0,//0表示处理成功，1表示处理失败 
    msg:'GET请求成功', //状态的描述
    data:query  //需要响应给客户端的数据
    
  })
})


//注意:如果要获取URL-encoded格式的请求体数据，必须配置中间件 app.use(express.urlencoded({extended:false}))

//编写post接口
router.post('/post',(req,res)=>{
  //1.获取客户端通过请求体，发送到服务器的URL-encoded数据
  const body = req.body
  //2.调用res.send()方法，把数据响应给客户端
  res.send({
    status:0,
    msg:'POST请求成功',
    data:body
  })
})



export default router
```



#### 使用cors中间件解决跨域问题

##### cors 是Express的一个第三方中间件，通过安装和配置cors中间件，可用很方便地解决跨域问题

使用步骤分为如下3步：

①： 运行npm install cors   安装cors中间件

②：使用import cors  from 'cors' 导入中间件

③：在路由之前调用 app.use(cors())配置中间件

##### 什么是cors

CORS(cross-origin-resource sharing,跨域资源共享)由一些列HTTP响应头组成，这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源

浏览器的**同源安全策略**默认会阻止网页"跨域"获取资源，但如果接口服务器配置了CORS相关的HTTP响应头， 就可用接触浏览器端的跨域访问限制

##### CORS的注意事项

①CORS主要在服务器端进行配置，客户端浏览器无须做任何额外的配置，即可请求开启了CORS的接口

②CORS在浏览器中有兼容性，只有支持XMLHttpRequest Level2的浏览器，才能正常访问开启了CORS的服务器端口

##### CORS响应头部  Access-Control-Allow-Origin

响应头部可用携带一个 Access-Control-Allow-Origin字段，其语法如下

```js
Access-Control-Allow-Origin:<https://www.baidu.com>|*

res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')  //只允许单个网站访问
res.setHeader('Access-Control-Allow-Origin','*')  //允许所有网站请求服务器接口
```

##### CORS响应头部  Access-Control-Allow-Headers

默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头：

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type(值仅限于text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过Access-Control-Allow-Headers对额外的请求头进行声明,否则这次请求就会失败!

```js
res.setHeader('Access-Control-Allow-Headers','Content-Type','X-Custon-Header')
```

##### CORS响应头部 Access-Control-Allow-Mehods

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求

如果客户端希望通过PUT、DELETE等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Allow-Methods来指明实际请求所允许使用的HTTP方法。

```js
//只允许POST、GET、DELETE、HEAD请求方法
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
//允许所有的HTTP请求方法
res.setHeader('Access-Control-Allow-Methods','*')
```

##### 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求

①请求方式为GET、POST、HEAD之外的请求Method类型

②请求头中包含自定义头部字段

③向服务器发送了application/json格式的数据

##### 简单请求和预检请求的区别

简单请求的特点:客户端和服务器之间只会发生一次请求。

预检请求的特点:客户端和服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求

#### JSONP接口

##### 概念:

浏览器端通过<script>标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用，这种请求数据的方式叫做JSONP

##### 特点:

​	①JSONP不属于真正的Ajax请求，因为它没有使用XMLHtppRquest这个对象

​	②JSONP仅支持GET请求，不支持POST、PUT、DELETE等请求

##### 创建JSONP接口的注意事项

如果项目中已经配置的CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明JSONP的接口。否则JSONP接口会被处理成开启CORS的接口。示例代码如下：

```js

//必须要在配置cors中间件之前，配置JSONP接口
app.get('/api/jsonp',(req,res)=>{
  //TODO:定义JSONP接口具体的实现过程
  
})

//一定要在路由模块之前导入这个cors中间件
import cors from 'cors'
app.use(cors())
//导入路由模块
import router from './02.apiRouter.js'

//为解决跨域问题 使用cors
```

##### 实现JSONP接口的步骤

①获取客户端发送过来的回调函数的名字

②得到要通过JSONP形式发送给客户端的数据

③根据前两步得到的数据，拼接出一个函数调用的字符串

④把前一步拼接得到的字符串，响应给客户端的 <script>标签进行解析执行

