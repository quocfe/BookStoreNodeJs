import express from 'express';
import userController from '../app/controllers/userController.js';

const router = express.Router();

// GET ALL USER
router.get('/getAll', userController.getAllUser);

export default router;
