//导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id =joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const new_user_pic=joi.string().dataUri().required()
//定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body:{
    username,
    password,
  }
}

//向外导出验证更新用户信息的规则对象
exports.update_userinfo_schema = {
  body:{
    id,
    nickname,
    email,
  }
}

//向外导出验证修改用户密码的规则对象
exports.update_userpwd_schema = {
  body:{
    oldPassword:password,
    newPassword:joi.not(joi.ref('oldPassword')).concat(password)
  }
}

//向外导出验证修改用户头像的规则对象
exports.upodate_userpic_schema={
  body:{
    new_user_pic
  }
}
