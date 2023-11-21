import express from 'express';
import reviewController from './../app/controllers/reviewController.js';

const router = express.Router();

// selectByBook
router.get('/selectByProduct/:id', reviewController.selectReviewWithProduct);
// Update book
router.put('/update/:id', reviewController.update);
// EIDT
router.get('/edit/:id', reviewController.edit);
// [DELETE]
router.delete('/:id', reviewController.delete);
// [POST]
router.post('/add', reviewController.add);
// [GET]
router.get('/', reviewController.index);
export default router;
