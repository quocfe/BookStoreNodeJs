import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.DB_USERNAME,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});

export default connection;
