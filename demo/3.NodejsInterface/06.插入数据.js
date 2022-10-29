const mysql = require('mysql')

const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin',
  database:'book'
})

//1.要插入users表中的数据对象
const user = {stu_name:'插入的数据2',password:'1245672'}
//2.要执行的sql语句
const sqlStr = 'INSERT INTO book.student_info set ?'

db.query(sqlStr,user,(err,res)=>{
  console.log(res);
    if(err) return console.log(err.message); //失败返回失败信息
    if(res.affectedRows) {console.log('插入数据成功');}
})

