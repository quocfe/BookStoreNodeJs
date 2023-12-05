import Comment from './../models/Comment.js';

const commentController = {
	getAll: async (req, res) => {
		try {
			const categorys = await Comment.selectAll();
			res.status(200).json(categorys);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	add: async (req, res) => {
		try {
			const newComment = {
				content: req.body.content,
				rating: req.body.rating,
				idUser: req.body.idUser,
				idReview: req.body.idReview,
				idProduct: req.body.idProduct,
			};

			await Comment.insert(newComment);
			res.status(200).json('add success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	delete: async (req, res) => {
		const idCmt = req.params.id;
		try {
			await Comment.delete(idCmt);
			res.status(200).json('delete success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const comment = await Comment.selectOne(id);
			res.status(200).json(comment);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	update: async (req, res) => {
		try {
			const idCmt = req.params.id;
			const newComment = {
				content: req.body.content,
				rating: req.body.rating,
				idUser: req.body.idUser,
				idReview: req.body.idReview,
				idProduct: req.body.idProduct,
			};

			await Category.update(idCmt, newComment);
			res.status(200).json('update success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default commentController;
