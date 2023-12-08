import { authenticateToken } from './../middlewares/authenticateToken.js';
import bookAdminRoutes from './admin/books.js';
import cateAdminRoutes from './admin/category.js';
import reviewAdminRoutes from './admin/review.js';
import authRoutes from './auth.js';
import bookRoutes from './books.js';
import cateRoutes from './category.js';
import reviewRoutes from './review.js';
import userRoutes from './user.js';
import commentRoutes from './comments.js';
import { authenticateAdminToken } from '../middlewares/authenticateAdminToken.js';

function routes(app) {
	// admin routes
	app.use('/v1/api/admin/book', authenticateAdminToken, bookAdminRoutes);
	app.use('/v1/api/admin/category', authenticateAdminToken, cateAdminRoutes);
	app.use('/v1/api/admin/review', authenticateAdminToken, reviewAdminRoutes);

	// client routes
	app.use('/v1/api/auth', authRoutes);
	app.use('/v1/api/user', userRoutes);
	app.use('/v1/api/comment', authenticateToken, commentRoutes);
	app.use('/v1/api/review', authenticateToken, reviewRoutes);
	app.use('/v1/api/category', authenticateToken, cateRoutes);
	app.use('/v1/api/book', authenticateToken, bookRoutes);
}

export default routes;
