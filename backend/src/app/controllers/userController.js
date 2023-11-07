import User from '../models/User.js';

const userController = {
	getAllUser: async (req, res) => {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default userController;
