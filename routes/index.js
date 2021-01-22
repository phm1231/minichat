var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/', function(req, res, next) {
	if(req.session && req.session.user){
		res.redirect('/room_list');
	}
	else{
		res.redirect('/login');
	}
})

module.exports = {
	router: router,
	start: function(io){
		io.on('connection', (socket)=>{
			console.log('user_connected');
			
			socket.on('disconnect', ()=>{
				console.log('user_disconnect');
			});

			socket.on('chat-msg', (msg)=>{ // msg.name msg.rid msg.message
				var n_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
				connection.query('INSERT INTO message (message_datetime, message_text, message_chat_id, message_user_id) VALUES ("' + n_time + '","' +  msg.message + '","' + msg.rid + '","' + msg.uid + '")', function(err, rows){
						if(err) throw err;
				});
				io.emit('chat-msg', msg);
			});

		});
	}
};
		
