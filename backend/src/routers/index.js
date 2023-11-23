import authRoutes from './auth.js';
import bookRoutes from './books.js';
import bookAdminRoutes from './admin/books.js';
import userRoutes from './user.js';
import reviewRoutes from './review.js';
import cateAdminRoutes from './admin/category.js';
import cateRoutes from './category.js';
import { authenticateToken } from './../middlewares/authenticateToken.js';

function routes(app) {
	// admin routes
	app.use('/v1/api/admin/book', bookAdminRoutes);
	app.use('/v1/api/admin/category', cateAdminRoutes);

	// client routes
	app.use('/v1/api/auth', authRoutes);
	app.use('/v1/api/user', userRoutes);
	app.use('/v1/api/review', reviewRoutes);
	app.use('/v1/api/category', authenticateToken, cateRoutes);
	app.use('/v1/api/book', authenticateToken, bookRoutes);
}

export default routes;
