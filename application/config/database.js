const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'csc317db',
    waitForConnections: true,
    //debug: true,

});

const promisePool = pool.promise();

module.exports = promisePool;