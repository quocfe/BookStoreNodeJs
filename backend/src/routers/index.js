import { authenticateToken } from './../middlewares/authenticateToken.js';
import bookAdminRoutes from './admin/books.js';
import cateAdminRoutes from './admin/category.js';
import reviewAdminRoutes from './admin/review.js';
import authRoutes from './auth.js';
import bookRoutes from './books.js';
import cateRoutes from './category.js';
import reviewRoutes from './review.js';
import userRoutes from './user.js';

function routes(app) {
	// admin routes
	app.use('/v1/api/admin/book', bookAdminRoutes);
	app.use('/v1/api/admin/category', cateAdminRoutes);
	app.use('/v1/api/admin/review', reviewAdminRoutes);

	// client routes
	app.use('/v1/api/auth', authRoutes);
	app.use('/v1/api/user', userRoutes);
	app.use('/v1/api/review', authenticateToken, reviewRoutes);
	app.use('/v1/api/category', authenticateToken, cateRoutes);
	app.use('/v1/api/book', authenticateToken, bookRoutes);
}

export default routes;
