import express from 'express';
import categoryController from '../app/controllers/categoryController.js';

const router = express.Router();

// Update cate
router.patch('/update/:id', categoryController.update);
// Edit
router.get('/edit/:id', categoryController.edit);
// Delete cate
router.delete('/delete/:id', categoryController.delete);
// Add cate
router.post('/add', categoryController.add);
// show list cate
router.get('/', categoryController.index);

export default router;
