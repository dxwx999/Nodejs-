//1、导入fs模块，来操作文件
const fs = require('fs')

//2、调用fs.readFile()方法来读取文件
//3、读取成功则data为返回内容，err为null
//4、读取失败则data为undifine,err为错误信息的对象

fs.readFile('./text/demo.txt','utf-8',(err,data)=>{
  if(err){
    return console.log('读取文件失败');
  }
  console.log('文件读取成功，内容是： '+data);
})
