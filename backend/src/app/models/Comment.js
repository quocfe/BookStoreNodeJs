import connection from './../../config/connect.js';

const executeQuery = (sql, values) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, values, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
};

const Comment = {
	insert: async (data) => {
		const { content, rating, idUser, idReview, idProduct } = data;

		const sql = `INSERT INTO comments (content, rating, idUser, idReview, idProduct) VALUES (?, ?, ?, ?, ?)`;

		const values = [content, rating, idUser, idReview, idProduct];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},

	selectAll: async () => {
		const sql = `SELECT comments.*, users.username FROM comments JOIN users ON comments.idUser = users.idUser`;

		try {
			const results = await executeQuery(sql);
			return results;
		} catch (error) {
			throw error;
		}
	},

	selectOne: async (id) => {
		const sql = `SELECT * FROM comments WHERE idcomments = ?`;

		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		const sql = `DELETE FROM comments WHERE idproducts = ?`;

		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	update: async ({ id }, { content, rating }) => {
		const sql = `UPDATE comments 
					SET content = ?,
							rating = ?,
					WHERE idcomments = ?`;

		const values = [content, rating, +id];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},
};

export default Comment;
