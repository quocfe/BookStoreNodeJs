import mysql from 'mysql2';

const connection = mysql.createConnection({
	host: 'localhost',
	database: 'bookenodejs',
	user: 'root',
	password: '123456',
});

export default connection;
