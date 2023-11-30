import Review from '../models/Review.js';

const reviewController = {
	index: async (req, res) => {
		try {
			const reviews = await Review.selectAll();
			res.status(200).json(reviews);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	selectOne: async (req, res) => {
		const id = req.params.id;
		try {
			await Review.updateView(id);
			const reviews = await Review.selectOne(id);
			res.status(200).json(reviews);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	add: async (req, res) => {
		try {
			const newReview = {
				content: req.body.content,
				idProduct: req.body.idProduct,
				idUser: req.body.idUser,
			};

			await Review.insert(newReview);
			res.status(200).json({
				message: 'success',
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},
	delete: async (req, res) => {
		const idBook = req.params.id;
		try {
			await Review.delete(idBook);
			res.status(200).json('delete success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const review = await Review.selectOne(id);
			res.status(200).json(review);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	update: async (req, res) => {
		try {
			const idReview = req.params.id;
			const newReview = {
				sortDescription: req.body.sortDescription,
				content: req.body.content,
				idProduct: req.body.idProduct,
			};

			await Book.update({ id: idReview }, newReview);
			res.status(200).json('update success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	selectReviewWithProduct: async (req, res) => {
		try {
			const idProduct = req.params.id;

			const review = await Review.selectReviewWithProduct(idProduct);
			res.status(200).json(review);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default reviewController;
