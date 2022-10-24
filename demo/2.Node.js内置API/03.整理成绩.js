const fs = require('fs')

fs.readFile('./text/grade.txt','utf-8',(err,data)=>{
  if(err){
    return console.log('读取文件失败'+err.message);
  }
  // console.log('读取文件成功,数据为'+data);//读取文件成功,数据为小红=98 小明=87 小王=89 小李=90 小张=88 小肖=39
  //1、先把成绩的数据按照空格分割
  const spArr=data.split(' ')
  const newArr=[]
  spArr.forEach(item=>{
    newArr.push(item.replace('=',':'))
  })
  const newArr2=newArr.join('\r\n')
  fs.writeFile('./text/newGrade.txt',newArr2,'utf-8',err=>{
    if(err){
    return  console.log('修改成功但写入失败，文件路径不存在');
    }
    console.log('修改成功并写入',);
  })
})
