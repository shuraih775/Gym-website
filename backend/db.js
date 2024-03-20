const mysql = require('mysql2');

function connectDB() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '763513',
    database: 'Gym',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  pool.on('connection', (connection) => {
    console.log('New connection established.');
  });

  pool.on('acquire', (connection) => {
    console.log('Connection acquired.');
  });

  pool.on('enqueue', () => {
    console.log('Waiting for available connection slot');
  });

  pool.on('release', (connection) => {
    console.log('Connection released');
  });

  return pool;
}


module.exports = connectDB;
