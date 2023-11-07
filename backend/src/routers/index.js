import authRoutes from './auth.js';
import bookRoutes from './books.js';
import userRoutes from './user.js';

function routes(app) {
	app.use('/api/user', userRoutes);
	app.use('/api/auth', authRoutes);
	app.use('/api/book', bookRoutes);
}

export default routes;
