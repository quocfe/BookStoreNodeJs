import authRoutes from './auth.js';
import bookRoutes from './books.js';
import userRoutes from './user.js';
import cateRoutes from './category.js';

function routes(app) {
	app.use('/v1/api/auth', authRoutes);
	app.use('/v1/api/user', userRoutes);
	app.use('/v1/api/category', cateRoutes);
	app.use('/v1/api/book', bookRoutes);
}

export default routes;
