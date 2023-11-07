import express from 'express';
import bookController from '../app/controllers/bookController.js';

const router = express.Router();

// router.get('/:isbn', (req, res) => {});
// Search book
router.get('/search', bookController.search);
// Update book
router.patch('/update/:id', bookController.update);
// Edit
router.get('/edit/:id', bookController.edit);
// Delete book
router.delete('/delete/:id', bookController.delete);
// Add book
router.post('/add', bookController.add);
// show list book
router.get('/', bookController.index);

export default router;
