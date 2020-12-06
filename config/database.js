const mysql = require('mysql');
const password = 'chatadmin'; // 이후 process.env.DATABASE_SPRINT_PASSWORD;로 바꾸기
const host = 'localhost';

let connection = mysql.createConnection({
    host,
    port: 3305,
    user: 'chatadmin',
    password,
    database: "minichat"
});
connection.connect();

module.exports = connection;
