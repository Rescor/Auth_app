import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export default connection;
