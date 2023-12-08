import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let userArr = [];

const authController = {
	// REGISTER
	register: async (req, res, next) => {
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.password, salt);

			const newUser = {
				username: req.body.username,
				email: req.body.email,
				password: hash,
			};
			const user = await User.insert(newUser);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
	// GENERATEACCESSTOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{ id: user.idUser, isAdmin: user.isAdmin },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '30s',
			}
		);
	},
	// GENERATEREFRESHTOKEN
	generateRefreshToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				isAdmin: user.isAdmin,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '30d' }
		);
	},
	// LOGIN
	login: async (req, res, next) => {
		try {
			const user = await User.selectOne({
				username: req.body.username,
			});

			if (!user[0]) {
				return res.status(404).json('Incorrect username');
			}
			const isPassword = await bcrypt.compare(
				req.body.password,
				user[0].password
			);

			if (!isPassword) {
				return res.status(404).send('Incorrect password');
			}

			const accessToken = authController.generateAccessToken(user[0]);
			const refreshToken = authController.generateRefreshToken(user[0]);

			await User.updateRefeshToken(refreshToken, user[0].idUser);

			const newUser = { ...user[0], accessToken };

			return res.json({ user: newUser });
			//
		} catch (error) {
			return next(error);
		}
	},
	// REQUESTREFRESHTOKEN
	requestRefreshToken: async (req, res) => {
		//Take refresh token from user
		const refreshToken = req.body.refreshToken;
		const idUser = req.body.idUser;
		//Send error if token is not valid
		if (!refreshToken) return res.status(401).json("You're not authenticated");
		const user = await User.selectOne({ idUser: idUser });
		userArr.push(user[0]);
		if (user[0].refreshToken != refreshToken) {
			return res.status(403).json('Refresh token is not valid');
		}

		const newAccessToken = authController.generateAccessToken(user[0]);

		res.status(200).json({
			accessToken: newAccessToken,
		});
	},
	//LOG OUT
	logOut: async (req, res) => {
		await User.updateRefeshToken(userArr.idUser, null);
		res.status(200).json('Logged out successfully!');
	},
};

export default authController;
