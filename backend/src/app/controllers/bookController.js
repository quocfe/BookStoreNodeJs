import Book from '../models/Book.js';

const bookController = {
	index: async (req, res) => {
		try {
			const { page, limit } = req.query;
			const offset = (page - 1) * limit;

			const books = await Book.selectAll(limit, offset);
			const [totaPageData] = await Book.countTotal();
			const totalPage = Math.ceil(+totaPageData?.count / limit);
			res.status(200).json({
				data: books,
				pagination: {
					page: +page,
					limit: +limit,
					totalPage,
				},
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},
	selectOne: async (req, res) => {
		const id = req.params.id;
		try {
			await Book.updateView(id);
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
			await Book.delete(idBook);
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
	isbnExists: async (req, res) => {
		try {
			const result = await Book.isbnExists(req.body.isbn);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	selectByNameCate: async (req, res) => {
		try {
			const id = req.params.id;

			const books = await Book.selectByNameCategory(id);
			res.status(200).json(books);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default bookController;
