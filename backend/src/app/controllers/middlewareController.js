import jwt from 'jsonwebtoken';

const middlewareController = {
	verifyToken: (req, res, next) => {
		const authHeader = req.header('Authorization');
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) return res.sendStatus(401);

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
			if (err) res.sendStatus(403);
			next();
		});
	},
};

export default middlewareController;
