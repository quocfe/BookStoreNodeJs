import express from 'express';
import authController from '../app/controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/refreshToken', authController.requestRefreshToken);
router.post('/login', authController.login);

export default router;
