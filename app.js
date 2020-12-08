// 모듈 불러오기
var connect = require('connect');
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var bodyParser = require("body-parser");
var session = require('express-session');

// 라우팅 모듈
var indexRouter = require('./routes/index')
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

// express 기본 설정
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
/*
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({
    secret: '1@#$%67890',
    resave: false,
    saveUninitialized: true
}));

// 라우팅 등록
app.use("/", indexRouter)
app.use('/signup/', signupRouter);
app.use('/login/', loginRouter);
app.use('/logout/', logoutRouter);




http.createServer(app).listen(8000);



