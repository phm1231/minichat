var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/', function(req, res) {
    if(req.session && req.session.user){ // already login
    	    connection.query('SELECT * FROM user WHERE user_login_id=?', [req.session.user.id], function(err, user_table, fields){ // login_id -> user_id
    	    connection.query('SELECT * FROM chat_room_user WHERE user_id=?', [user_table[0].user_id], function(err, id_tables, fields) { // user_id -> chat room id
    	    	if(err) throw err;
				var lists="";
				for(var i=0; i<id_tables.length; i++){
					connection.query('SELECT * FROM chat_room WHERE chat_room_id=?', [id_tables[i].chat_room_id], function(err, rooms, fields){
						for(var j=0; j<rooms.length; j++){
							 lists += ' <li><a href=" '+ rooms[j].chat_room_address + '">' + rooms[j].chat_room_title + '</a></li>';
						}
						res.render(__dirname + "/../views/room_list", {lists:lists});
					});
    			};
			});
		});
    }

    else {
		console.log("else");
    }
})

module.exports = router;
