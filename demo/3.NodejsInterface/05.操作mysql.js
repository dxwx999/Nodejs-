const mysql = require('mysql')

const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'admin',
  database:'book'
})

db.query('SELECT * from book.student_info',(err,result)=>{
  if(err){
     return console.log(err);
  }
  console.log('=====================');
  console.log(result);
})