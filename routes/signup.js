var express = require('express');
var router = express.Router();
var connection = require('../config/database');

router.get('/', function(req, res, next) {
    res.render('signup');
})

router.post('/', function(req, res) {
    var body = req.body;
    var login_id = body.login_id;
    var password = body.password;
    var password_re = body.password_re;

    connection.query('INSERT INTO user (user_password, user_login_id) values ("' + password + '", "' + login_id + '")', function(err, rows) {
        if(err) throw err;
    })
    res.redirect('/login');
})

module.exports = router;