import Book from '../models/Book.js';
import User from '../models/User.js';

const bookController = {
	index: async (req, res) => {
		try {
			const books = await Book.find();
			res.status(200).json(books);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	add: async (req, res) => {
		try {
			const newBook = new Book({
				title: req.body.title,
				author: req.body.author,
				isbn: req.body.isbn,
				year: req.body.year,
				image: req.body.image,
				review_count: req.body.review_count,
				average_score: req.body.average_score,
			});

			const book = await newBook.save();
			res.status(200).json('add success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	delete: async (req, res) => {
		const idBook = req.params.id;
		try {
			await Book.deleteOne({ _id: idBook });
			res.status(200).json('delete success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const book = await Book.findById(id);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	update: async (req, res) => {
		try {
			const idBook = req.params.id;

			await Book.updateOne({ _id: idBook }, req.body);
			res.status(200).json('update success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	search: async (req, res) => {
		const searchQuery = req.query.q;

		try {
			const result = await Book.find({
				$or: [
					{ title: { $regex: searchQuery, $options: 'i' } },
					{ author: { $regex: searchQuery, $options: 'i' } },
				],
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default bookController;
