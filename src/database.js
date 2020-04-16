const mysql = require('mysql');
const {promisify} = require('util');


const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE CONNECTION HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONREFUSED'){
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});
//Promisify pool Querys
pool.query = promisify(pool.query);

module.exports = pool;