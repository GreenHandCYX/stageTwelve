let express = require('express')
let user = require('../models/user')

//二级主路由
let login = express.Router();

login.get('/',(req,res)=>{
	res.end('haha')
})

//设置子路由
login.post('/',(req,res)=>{
	user.login(req.body.email,req.body.pass,(err,row)=>{
		if(!err){
				return res.json({
					code:10000,
					msg:'登录成功'
				})
		}
	
		res.json({
			code:10001,
			msg:err.msg
		})
	})
})


module.exports = login