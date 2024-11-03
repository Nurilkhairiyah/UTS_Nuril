// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: 'your_password', // Ganti dengan password MySQL Anda
    database: 'online_course_management',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

module.exports = connection;