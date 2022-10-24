//导入 express
import express from 'express'

//创建 express 的服务器实例 
const app = express()


//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))



//为解决跨域问题 使用cors
//必须要在配置cors中间件之前，配置JSONP接口
app.get('/api/jsonp',(req,res)=>{
  //TODO:定义JSONP接口具体的实现过程
  //1.获取客户端发送过来的回调函数的名字
  const funcName = req.query.callback
  //2.得到要通过JSONP形式发送给客户端的数据
  const data ={name:'zs',age:22}
  //3.根据前两步得到的数据，拼接吃u一个函数调用的字符串
  const scriptStr = `${funcNmae}($(JSON.stringify(data)))`
  //4.把上一步拼接得到的字符串，响应给客户端<script>标签进行解析执行
  res.send(scriptStr)
})

//一定要在路由模块之前导入这个cors中间件
import cors from 'cors'
app.use(cors())
//导入路由模块
import router from './02.apiRouter.js'



//把路由模块注册到app上
app.use('/api',router)

//调用app.listen方法，指定端口号并启动web服务器
app.listen(80,()=>{
  console.log('Express server running at http://127.0.0.1');
})