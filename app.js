var connect = require('connect')
var http = require('http')
var fs = require('fs')
var express = require('express');
var app = express()

var indexRouter = require('./routes/index')

app.use('/', indexRouter)


http.createServer(app).listen(8000);
