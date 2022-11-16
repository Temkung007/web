const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "blog",
    port: 3306
})


module.exports = db;