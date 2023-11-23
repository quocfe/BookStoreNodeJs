import express from 'express';
import categoryController from '../app/controllers/categoryController.js';

const router = express.Router();

router.put('/update/:id', categoryController.update);
router.get('/edit/:id', categoryController.edit);
router.delete('/:id', categoryController.delete);
router.post('/add', categoryController.add);
router.get('/', categoryController.index);

export default router;
