var connect = require('connect')
var http = require('http')
var fs = require('fs')
var express = require('express');
var app = express()

var indexRouter = require('./routes/index')

const server = http.createServer(app);
const io = require('socket.io')(server);
var port = 8000;

server.listen(port, ()=>{
		console.log('listening on port : %d', port);
		});

app.get('/', (req, res)=>{
		res.sendFile(__dirname + '/views/index.html');
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

app.use('/', indexRouter)


//http.createServer(app).listen(8000);
