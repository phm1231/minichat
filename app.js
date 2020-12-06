var connect = require('connect');
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index')

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use("/", indexRouter)


http.createServer(app).listen(8000);



