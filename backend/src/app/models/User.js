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

const User = {
	insert: async (data) => {
		const { username, email, password } = data;
		const sql =
			'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
		const values = [username, email, password];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},
	updateRefeshToken: async (refreshToken, id) => {
		const sql = 'UPDATE users SET	refreshToken = ? WHERE idUser = ?';
		const values = [refreshToken, id];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},
	selectAll: async () => {
		const sql = 'SELECT * FROM users';

		try {
			const results = await executeQuery(sql);
			return results;
		} catch (error) {
			throw error;
		}
	},
	selectOne: async (object) => {
		try {
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					const value = object[key];
					const sql = `SELECT * FROM users WHERE ${key} = ?`;
					const results = await executeQuery(sql, [value]);
					return results;
				}
			}
		} catch (error) {
			throw error;
		}
	},
};

export default User;
