var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/', function(req, res){
    if(req.session && req.session.user){
        console.log('로그인된 상태에서 로그인 시도');
        res.redirect('/room_list');
    }
    else {
        console.log('로그인 시작');
        res.render('login');
    }
        
})

router.post('/', function(req, res) {
    var body = req.body;
    var login_id = body.login_id;
    var password = body.password;
    if(req.session && req.session.user) {
        res.send('already login');
		res.redirect('/room_list');
    }
    else {
        connection.query('SELECT * FROM user WHERE user_login_id=?', [login_id], function(err, results, fields) {
			console.log("login results : " + results[0].user_password);
            if(err) throw err;
            if(results.length > 0) {
                if(results[0].user_password == password) {
                    req.session.user = 
                    {
                        id : login_id,
                        createdTime : new Date(),
                        authorized : true
                    };
                   	console.log("login successful");
					res.redirect('/room_list'); // index
                }else {
                    res.send("id and password doesn't match");
                }
            }
            else {
                res.send("id doesn't match");
            }
        })
    }

    
})

module.exports = router;
