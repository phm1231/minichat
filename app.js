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


const server = http.createServer(app);
const io = require('socket.io')(server);
var port = 8000;

server.listen(port, ()=>{
		console.log('listening on port : %d', port);
		});

io.on('connection', (socket)=>{
		console.log('user_connected');
		socket.on('disconnect', ()=>{
				console.log('user_disconnected');
				});
		socket.on('chat-msg', (msg)=>{
				io.emit('chat-msg', msg);
				});
});

