import express from 'express';
import bookController from '../../app/controllers/bookController.js';

const router = express.Router();

// Update book
router.put('/update/:id', bookController.update);
// Edit
router.get('/edit/:id', bookController.edit);
// Delete book
router.delete('/:id', bookController.delete);
// Add book
router.post('/add', bookController.add);
// get one
router.get('/:id', bookController.selectOne);
// show list book
router.get('/', bookController.index);

export default router;
