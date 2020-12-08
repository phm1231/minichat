var express = require('express');
var router = express.Router();
var connection = require('../config/database');


router.get('/', function(req, res, next) {
    if(req.session.user) {
        req.session.destroy(
            function(err) {
                if (err) throw err;
            }
        )
        console.log('세션 삭제 성공');
        res.redirect('/login');
    }
    else {
        console.log('로그인 안되어 있음');
        res.redirect('/login');
    }
})


module.exports = router;