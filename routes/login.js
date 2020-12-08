var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/', function(req, res, next) {
    res.render('login');
})

router.post('/', function(req, res) {
    var body = req.body;
    var login_id = body.login_id;
    var password = body.password;

    connection.query('SELECT * FROM user WHERE user_login_id=?', [login_id], function(err, results, fields) {
        if(err) throw err;
        if(results.length > 0) {
            if(results[0].user_password == password) {
                res.send("login successful");
            }else {
                res.send("id and password doesn't match");
            }
        }
        else {
            res.send("id doesn't match");
        }
    })
})

module.exports = router;