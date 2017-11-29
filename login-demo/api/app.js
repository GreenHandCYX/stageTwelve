let express = require('express')
//创建服务器
let app = express();

let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

let cors = require('cors')
app.use(cors())


let session = require('express-session');
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: false
}));

//allow custom header and CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //带cookies
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.listen(3000,err=>{
    !err && console.log('已在3000端口启动');
})


let login = require('./routes/login')

//对所有中间件设置跨域访问为cors

 
//利用中间件处理请求
app.use('/login',login);





