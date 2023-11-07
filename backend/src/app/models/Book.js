import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
	title: String,
	author: String,
	description: String,
	isbn: {
		type: String,
		unique: true,
	},
	year: Number,
	image: String,
	review_count: Number,
	average_score: Number,
});

export default mongoose.model('Book', BookSchema);
