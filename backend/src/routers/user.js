import express from 'express';
import userController from '../app/controllers/userController.js';

const router = express.Router();

// GET ALL USER
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);

export default router;
