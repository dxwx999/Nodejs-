//导入数据库操作模块
const db =require('../db')

exports.getUserInfo =(req,res)=>{
  //定义查询用户信息的SQL语句
  const sql =`SELECT id,username,nickname,email,user_pic from ev_users where id=?`
  //调用db.query()执行sql语句
  db.query(sql,req.auth.id,(err,result)=>{
    //执行sql语句失败
    if(err) return res.cc(err)
    //执行sql语句成功，但结果不正确，为空
    if(result.length!==1)return res.cc('获取用户信息失败')

    //用户信息获取成功
    res.send({
      status:0,
      message:'获取用户信息成功',
      data:result[0]
    })
  })
}


exports.updateUserinfo = (req,res)=>{
  const sql = `update ev_users set ? where id=?`
  db.query(sql,[req.body,req.body.id],(err,result)=>{
    //执行SQL语句失败
    if(err) return res.cc(err)
    console.log(result.affectedRows);
    //执行SQL语句成功，但是影响行数不为1
    if(result.affectedRows!==1)return res.cc('更新用户信息失败')
    //修改用户信息成功
    return res.cc('修改用户信息成功',0)
  })
}

//导入bcryptjs包进行对密码的解密操作
const bcrypt = require('bcryptjs')

exports.updateUserPwd = (req,res)=>{
  const sql = `SELECT password FROM ev_users where id=?`
  db.query(sql,[req.auth.id],(err,result)=>{
    //执行sql语句报错，返回错误对象
    if(err)return res.cc(err)
    //没有查询到该id的账户，返回错误语句
    if(result.length!==1)return res.cc('当前用户不存在')
    //查询到了该用户，进行密码对比
    const compareResult = bcrypt.compareSync(req.body.oldPassword,result[0].password)
    if(!compareResult) return res.cc('旧密码不正确')
    const updatePwdSql = `UPDATE ev_users set password=? where id=?`
    //在修改新密码之前对新密码进行加密
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword,10)
    db.query(updatePwdSql,[req.body.newPassword,req.auth.id],(err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows!==1)return res.cc('更新密码失败')
      res.cc('更新密码成功')
    })
  })
}


//更新用户头像的处理函数
exports.updateUserAvater = (req,res)=>{
  //定义更新头像的sql语句
  const sql = `UPDATE ev_users set user_pic=? where id=?`
  db.query(sql,[req.body.new_user_pic,req.auth.id],(err,result)=>{
    if(err) return res.cc(err)
    if(result.affectedRows!==1)return res.cc('修改头像失败')
    res.cc('修改头像成功',0)
  })
} 