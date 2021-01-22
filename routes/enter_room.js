var express = require('express');
var router = express.Router();
var connection = require('../config/database');
var url = require('url');


router.get('/', function(req, res) {
	if(req.session && req.session.user){
		var contents="";
		var rid = -1;
		var uid = -1;
		var _url = req.url;
		var name = req.session.user.id;
		var room_title = url.parse(_url, true).query.room_title;
		var check = true;
		var tmp_text = [];
		var tmp_id = [];
		var i;
		connection.query('SELECT * FROM chat_room WHERE chat_room_title=?', room_title, function(err, chat_room_table, fields){
			if(err) throw err;
			if(chat_room_table.length == 0){
				check = false;
				res.redirect('/room_list');
			}
			else{
				rid = chat_room_table[0].chat_room_id;

				connection.query('SELECT * FROM message WHERE message_chat_id=?', rid, function(err, message_table, fields){
					if(err) throw err;

					for(i=0; i<message_table.length; i++){
						tmp_text[i] =  message_table[i].message_text;
						tmp_id[i] = message_table[i].message_user_id;
					}

					connection.query('SELECT * FROM user', function(err, user_t,fields){
						var search_id;
						for(i=0; i<tmp_id.length; i++){
							search_id = tmp_id[i];
							for(var j=0; j<user_t.length; j++){
								if(user_t[j].user_id == search_id){
									tmp_id[i] = user_t[j].user_login_id;
								}
							}
						}
					});
				});

				connection.query('SELECT * FROM user WHERE user_login_id=?', name, function(err, user_table, fields){
					if(err) throw err;
					uid = user_table[0].user_id;
				});
			}	
		});

		if(check)
			setTimeout(function(){ 
						for(i=0; i<tmp_id.length; i++)
							contents += "<li>" + tmp_id[i] + " : " + tmp_text[i] + "</li>";
						res.render(__dirname + '/../views/index', {name: name, uid: uid, rid: rid, des: contents})
					}, 1000);
	}

	else{
		res.redirect('/login');
	}
})

module.exports = router;
