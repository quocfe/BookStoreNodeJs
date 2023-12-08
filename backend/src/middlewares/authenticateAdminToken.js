import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authenticateAdminToken = (req, res, next) => {
	const token = req.headers.token;
	console.log('token', token);
	if (token) {
		const accessToken = token.split(' ')[1];
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(403).json('token is not valid');
			console.log('req.user', user);
			if (user.isAdmin == 'true') {
				next();
			}
		});
	} else {
		res.status(401).json('You are not admin');
	}
};
