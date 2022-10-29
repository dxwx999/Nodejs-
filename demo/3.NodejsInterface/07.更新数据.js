const mysql = require('mysql')
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin',
  database:'book'
})
let sql = 'UPDATE book.student_info set ? where id=?'
const user = {id:12,stu_name:'更新后的数据3',password:'zxcvzxc'}
db.query(sql,[user,user.id],(err,res)=>{
  if(err)return console.log(err.message);
  if(res.affectedRows){
    console.log('更新数据成功');
  }
})