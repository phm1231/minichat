var connect = require('connect')
var http = require('http')
var fs = require('fs')
var app = connect()

function index(request, response) {
    fs.createReadStream('./views/index.ejs').pipe(response)
}


app.use('/', index);
http.createServer(app).listen(8000);
