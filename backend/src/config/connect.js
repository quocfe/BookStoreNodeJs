import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const db = {
	connect: async () => {
		try {
			await mongoose.connect(process.env.MONGO);
			console.log('connect mongodb');
		} catch (error) {
			console.log(error);
		}
	},
};

mongoose.connection.on('disconnected', () => {
	console.log('MONGO disconnected');
});

mongoose.connection.on('connected', () => {
	console.log('MONGO connected');
});

export default db;
