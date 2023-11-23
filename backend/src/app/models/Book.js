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

const Book = {
	insert: async (data) => {
		const {
			nameProduct,
			authorProduct,
			sortDescription,
			description,
			priceProduct,
			images,
			year,
			isbn,
			idCategory,
		} = data;

		const sql = `INSERT INTO books (nameProduct, authorProduct, sortDescription, description, priceProduct, images, year,isbn, idCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		const values = [
			nameProduct,
			authorProduct,
			sortDescription,
			description,
			priceProduct,
			images,
			year,
			isbn,
			idCategory,
		];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},

	selectAll: async (limit, offset) => {
		const sql = `SELECT * FROM books limit ? offset ?`;

		try {
			const results = await executeQuery(sql, [+limit, +offset]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	countTotal: async () => {
		const sql = `SELECT count(*) as count FROM books `;

		try {
			const results = await executeQuery(sql);
			return results;
		} catch (error) {
			throw error;
		}
	},

	selectOne: async (id) => {
		const sql = `SELECT * FROM books WHERE idProduct = ?`;
		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	selectByNameCategory: async (id) => {
		const sql = `SELECT * FROM books WHERE idCategory = ?`;
		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		const sql = `DELETE FROM books WHERE idProduct = ?`;

		try {
			const results = await executeQuery(sql, [id]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	search: async (query) => {
		const sql = `SELECT * FROM books WHERE nameProduct LIKE ?`;

		try {
			const results = await executeQuery(sql, [`%${query}%`]);
			return results;
		} catch (error) {
			throw error;
		}
	},

	update: async (
		{ id },
		{
			nameProduct,
			authorProduct,
			sortDescription,
			description,
			priceProduct,
			images,
			year,
			isbn,
			idCategory,
		}
	) => {
		const sql = `UPDATE books 
					SET nameProduct = ?,
							authorProduct = ?,
							sortDescription = ?,
							description = ?,
							priceProduct = ?,
							images = ?,
							year = ?,
							isbn = ?,
							idCategory = ?
					WHERE idProduct = ?`;

		const values = [
			nameProduct,
			authorProduct,
			sortDescription,
			description,
			priceProduct,
			images,
			year,
			isbn,
			idCategory,
			+id,
		];

		try {
			const results = await executeQuery(sql, values);
			return results;
		} catch (error) {
			throw error;
		}
	},

	updateView: async (id) => {
		console.log('update view');
		const sql = `UPDATE books SET view = view + 1 WHERE idProduct = ?`;
		try {
			await executeQuery(sql, [+id]);
		} catch (error) {
			throw error;
		}
	},

	isbnExists: async (isbn) => {
		const sql = `SELECT COUNT(*) AS count FROM books WHERE isbn = ?`;
		try {
			const result = await executeQuery(sql, [isbn]);
			// Kiểm tra nếu có ít nhất một cuốn sách có số ISBN trùng
			return result[0].count > 0;
		} catch (error) {
			throw error;
		}
	},
};

export default Book;
