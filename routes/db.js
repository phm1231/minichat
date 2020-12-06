var express = require('express')
var router = express.Router();
var db = require('../config/database');




router.get('/', function(req, res, next) {
    var data;
    db.query('SELECT * from user', (error, rows) => {
        if (error) throw error;
        console.log(rows);
        data = {'rows': rows};
        res.render('../views/db.ejs', {'rows': rows})
    })
    db.query('SELECT * FROM message', (error, rows) => {
        if (error) throw error;
        
    })

})

module.exports = router