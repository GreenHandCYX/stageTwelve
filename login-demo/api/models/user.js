let db = require('./db')


exports.login = (email,pass,cb)=>{
	let sql = 'select * from users where email=?';
	db.query(sql,email,(err,rows)=>{
		if(err){
			return cb(err)
		}
		if(!rows[0]){
			return cb({
				msg:'用户不存在'
			})
		}
		if(pass== rows[0].pass){
			return cb(null,rows[0])
		}
		  cb({
            msg:'用户或密码错误'
        })
	})
}