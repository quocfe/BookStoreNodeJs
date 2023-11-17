import connection from '../../config/connect.js';

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

const Category = {
	insert: async (data) => {
		const { nameCategory } = data;

		const sql = 'INSERT INTO category (nameCategory) VALUES (?)';

		const values = [nameCategory];

		try {
			const result = await executeQuery(sql, values);
			return result;
		} catch (error) {
			throw error;
		}
	},
	selectAll: async () => {
		const sql = `SELECT * FROM category`;

		try {
			const results = await executeQuery(sql);
			return results;
		} catch (error) {
			throw error;
		}
	},
	selectOne: async (id) => {
		const sql = `SELECT * FROM category WHERE idCategory = ?`;

		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},
	delete: async ({ id }) => {
		const sql = `DELETE FROM category WHERE idCategory = ?`;

		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},
};

export default Category;
