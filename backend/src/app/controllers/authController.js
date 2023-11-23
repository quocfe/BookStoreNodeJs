import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let refreshTokens = [];

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
		console.log('user token', user);
		return jwt.sign(
			{ id: user.id, isAdmin: user.isAdmin },
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

			refreshTokens.push(refreshToken);

			const newUser = { ...user[0], accessToken, refreshToken };

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
		//Send error if token is not valid
		if (!refreshToken) return res.status(401).json("You're not authenticated");
		if (!refreshTokens.includes(refreshToken)) {
			return res.status(403).json('Refresh token is not valid');
		}
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
			if (err) res.sendStatus(403);
			refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
			const newAccessToken = authController.generateAccessToken(data);
			const newRefreshToken = authController.generateRefreshToken(data);
			refreshTokens.push(newRefreshToken);

			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		});
	},
	//LOG OUT
	logOut: async (req, res) => {
		refreshTokens = refreshTokens.filter(
			(token) => token !== req.headers.token
		);
		res.status(200).json('Logged out successfully!');
	},
};

export default authController;
