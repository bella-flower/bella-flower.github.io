var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
/*var session = require('express-session');*/

var index = require('./routes/index');

global.dbHandel = require('./database/dbHandle');
//建立数据库连接
global.db = mongoose.connect("mongodb://localhost:27017/nodedb",{useMongoClient:true});
var app = express();
/*//router为history时可以配置session设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  //将外源设为指定的域，比如：http://localhost:8080
  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
//将Access-Control-Allow-Credentials设为true
  res.header('Access-Control-Allow-Credentials', true);
  next();
});*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//开发阶段开启第三方通信端口，开发完成后 可删掉cors
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST','OPTIONS','DELETE','PUT'],
  alloweHeaders:['Conten-Type', 'Authorization','Access-Control-Allow-Credentials','Access-Control-Allow-Origin']
}));

/*app.use(session({
  secret: 'secret',
  cookie:{
    maxAge: 1000*60*30
  }
}));*/
app.use('/', index);
app.use('/login', index);

module.exports = app;
