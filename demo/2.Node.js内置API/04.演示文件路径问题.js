const fs = require('fs')

fs.readFile(__dirname+'/text/demo.txt','utf-8',(err,data)=>{
  if(err){
    return console.log('文件读取失败');
  }
  console.log(data);
})