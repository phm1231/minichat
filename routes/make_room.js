var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/', function(req, res){
    if(req.session && req.session.user){
        res.render('make_room');
    }
    else {
        res.redirect('/login');
    }
   
})

router.post('/', function(req, res) {
    var body = req.body;
    var room_title = body.room_title;
    var password = body.password;
	var user_login_id = req.session.user.id;
	var tmp_address = "/enter_room/?room_title=" + room_title;

	connection.query('SELECT * FROM user WHERE user_login_id=?', [user_login_id], function(err, user_table, fields){
			if(err) throw err;
			connection.query('INSERT INTO chat_room (chat_room_title, chat_room_address) values ("' + room_title + '", "' + tmp_address +'")', function(err, rows) {
            	if(err) throw err;
    		})
			connection.query('SELECT * FROM chat_room WHERE chat_room_title=?', [room_title], function(err, room_table, fields){
            	if(err) throw err;
				connection.query('INSERT INTO chat_room_user (chat_room_id, user_id) values ("' + room_table[0].chat_room_id + '", "' + user_table[0].user_id +'")', function(err, rows) {
            		if(err) throw err;
    			})
			})
	})
	res.redirect("/room_list");
})

module.exports = router;
