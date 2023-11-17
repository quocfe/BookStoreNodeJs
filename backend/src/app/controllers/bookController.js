import Book from '../models/Book.js';

const bookController = {
	index: async (req, res) => {
		try {
			const books = await Book.selectAll();
			res.status(200).json(books);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	selectOne: async (req, res) => {
		const id = req.params.id;
		try {
			const book = await Book.selectOne(id);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	add: async (req, res) => {
		try {
			const newBook = {
				nameProduct: req.body.nameProduct,
				authorProduct: req.body.authorProduct,
				sortDescription: req.body.sortDescription,
				description: req.body.description,
				priceProduct: req.body.priceProduct,
				images: req.body.images,
				year: req.body.year,
				isbn: req.body.isbn,
				idCategory: req.body.idCategory,
			};

			await Book.insert(newBook);
			res.status(200).json('add success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	delete: async (req, res) => {
		const idBook = req.params.id;
		try {
			await Book.delete({ idProduct: idBook });
			res.status(200).json('delete success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const book = await Book.selectOne(id);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	update: async (req, res) => {
		try {
			const idBook = req.params.id;
			const newBook = {
				nameProduct: req.body.nameProduct,
				authorProduct: req.body.authorProduct,
				sortDescription: req.body.sortDescription,
				description: req.body.description,
				priceProduct: req.body.priceProduct,
				images: req.body.images,
				year: req.body.year,
				isbn: req.body.isbn,
				idCategory: req.body.idCategory,
			};

			await Book.update({ id: idBook }, newBook);
			res.status(200).json('update success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	search: async (req, res) => {
		const searchQuery = req.query.q;

		try {
			const result = await Book.search(searchQuery);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default bookController;
