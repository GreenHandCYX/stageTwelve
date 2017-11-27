let express = require('express')
//创建服务器
let app = express();
app.listen(3000,err=>{
    err && console.log(err);
})


let login = require('./routes/login')


//利用中间件处理请求
app.use('/login',login);

//对所有中间件设置跨域访问为cors
app.all('*',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*"); 
})



