//导入http模块
const http = require('http')

//创建web服务器实例
const server =http.createServer()

//为服务器实例绑定request事件，监听客户端的请求
server.on('request',function(req,res){
    console.log(req.url);
    console.log("===================");
    let str1=`请求的地址是${req.url}，请求的方式为${req.method}`
    console.log(req.method);
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(str1)
})

server.listen('7777',function(){
  console.log('server running at 127.0.0.1');
})