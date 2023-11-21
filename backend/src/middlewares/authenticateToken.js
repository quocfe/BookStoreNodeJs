import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
	const token = req.headers.token;
	if (token) {
		const accessToken = token.split(' ')[1];
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403).json('token is not valid');
			req.user = user;
			next();
		});
	} else {
		res.status(401).json('You are not authenticated');
	}
};
