//1.导入fs文件系统模块
const fs = require('fs')

//2.调用fs.writeFile()方法，写入文件的内容
//  参数1:表示写入文件的路径
//  参数2:表示要写入的内容
//  参数3:写入的编吗格式
//  参数4:回调函数
//  注意:主要路径存在，就会覆盖并写入文件，如果文件不存在会创建文件
fs.writeFile('c./text/demo1.txt','我来给你加点文字','utf-8',(err)=>{
  if(err){
   return  console.log('写入失败，文件路径不存在'+err.message);  
  }
  console.log('写入成功');
  //如果写入成功则返回null
})