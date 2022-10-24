const path = require('path')
const fs = require('fs')
//../会抵消前面的一层路径
// const pathStr = path.join('/a','/b/c','../','./d','e')
// console.log(pathStr);


fs.readFile(path.join(__dirname,'/text/demo.txt'),'utf-8',(err,data)=>{
  if(err){
    return console.log('读取失败');
  }
  console.log(data); //对啊，我来给你加点文字
})

console.log(path.basename('/text/demo.txt')); //demo.txt
console.log(path.basename('/text/demo.txt','.txt')); //demo
console.log(path.extname('/text/demo.txt')); //.txt