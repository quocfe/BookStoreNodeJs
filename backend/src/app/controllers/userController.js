import User from '../models/User.js';

const userController = {
	getAllUser: async (req, res) => {
		try {
			const users = await User.selectAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getUser: async (req, res) => {
		const id = req.params.id;
		try {
			const user = await User.selectOne({ idUser: id });
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default userController;
