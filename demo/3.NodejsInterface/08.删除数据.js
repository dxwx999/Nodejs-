const mysql = require('mysql')
const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin',
  database:'book'
})


// db.query('DELETE from book.student_info where id=10',(err,res)=>{
//   if(err) return console.log(err.message);
//   console.log(res.affectedRows);
// })
// db.query('UPDATE book.student_info set status=1 where id=11',(err,res)=>{
//   if(err) return console.log(err.message);
//   if(res.affectedRows){
//     console.log('删除成功');
//   }
// })
db.query('UPDATE book.student_info set status=0 where id=11',(err,res)=>{
    if(err) return console.log(err.message);
    if(res.affectedRows){
      console.log('恢复成功');
    }
  })