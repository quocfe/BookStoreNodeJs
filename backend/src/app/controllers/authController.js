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

			await User.insert(newUser);
			res.status(200).json({
				message: 'register success',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: 'Registration failed. Please try again later.',
			});
		}
	},
	// GENERATEACCESSTOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{ id: user.idUser, isAdmin: user.isAdmin },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '10s',
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
				return res.status(404).json('Incorrect password');
			}

			const accessToken = authController.generateAccessToken(user[0]);
			const refreshToken = authController.generateRefreshToken(user[0]);

			await User.updateRefeshToken(refreshToken, user[0].idUser);

			const newUser = {
				...user[0],
				refreshToken: refreshToken,
				accessToken: accessToken,
			};

			const data = {
				user: newUser,
				message: 'Login success',
			};

			return res.json(data);
			//
		} catch (error) {
			return next(error);
		}
	},
	// REQUESTREFRESHTOKEN
	requestRefreshToken: async (req, res) => {
		const refreshToken = req.body.refreshToken;
		const idUser = req.body.idUser;
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
