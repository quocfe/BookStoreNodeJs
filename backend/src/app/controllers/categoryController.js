import Category from '../models/Category.js';

const categoryController = {
	index: async (req, res) => {
		try {
			const categorys = await Category.selectAll();
			res.status(200).json(categorys);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	add: async (req, res) => {
		try {
			const newCate = {
				idCategory: req.body.idCategory,
			};

			await Category.insert(newCate);
			res.status(200).json('add success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	delete: async (req, res) => {
		const idCate = req.params.id;
		try {
			await Category.delete({ idCategory: idCate });
			res.status(200).json('delete success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const category = await Category.selectOne(id);
			res.status(200).json(category);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	update: async (req, res) => {
		try {
			const idBook = req.params.id;

			await Category.updateOne({ _id: idBook }, req.body);
			// sais
			res.status(200).json('update success');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default categoryController;
