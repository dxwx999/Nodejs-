const http = require('http')
const server = http.createServer()

server.on('request',(req,res)=>{
  const url = req.url
  let content = '<h1> 404 NOT FOUND</h1>'
  if(url==='/'||url==='/index.html'){
     content = '<h1>首页</h1>'
  }else if (url ==='/about.html'){
     content = '<h1>关于页面</h1>'
  }
  console.log(req.url,req.method);
  res.end(content)
})

server.listen('80',()=>{
  console.log('80端口正在监听');
})