import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let refreshTokens = [];

const authController = {
	// REGISTER
	register: async (req, res, next) => {
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(req.body.password, salt);

			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: hash,
			});
			const user = await newUser.save();
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
	// GENERATEACCESSTOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '60s',
			}
		);
	},
	// GENERATEREFRESHTOKEN
	generateRefreshToken: (user) => {
		return jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '365d' }
		);
	},
	loginView: (req, res) => {
		res.render('login');
	},
	// LOGIN
	login: async (req, res, next) => {
		try {
			const user = await User.findOne({
				username: req.body.username,
			});

			if (!user) res.status(404).json('Incorrect username');

			const isPassword = await bcrypt.compare(req.body.password, user.password);

			if (!isPassword) res.status(404).json('Incorrect password');

			if (user && isPassword) {
				const accessToken = authController.generateAccessToken(user);
				const refreshToken = authController.generateRefreshToken(user);

				refreshTokens.push(refreshToken);

				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure: false,
					path: '/',
					sameSite: 'strict',
				});
				res.json({ accessToken, refreshToken });
			}
			//
		} catch (error) {
			res.status(500).json(err);
		}
	},
	// REQUESTREFRESHTOKEN
	requestRefreshToken: async (req, res) => {
		//Take refresh token from user
		const refreshToken = req.cookies.refreshToken;
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
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: false,
				path: '/',
				sameSite: 'strict',
			});
			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		});
	},
	//LOG OUT
	logOut: async (req, res) => {
		//Clear cookies when user logs out
		refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
		res.clearCookie('refreshToken');
		res.status(200).json('Logged out successfully!');
	},
};

export default authController;
