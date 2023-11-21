import express from 'express';
import authController from '../app/controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refreshToken', authController.requestRefreshToken);
router.delete('/logout', authController.logOut);

export default router;
