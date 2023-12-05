import express from 'express';
import commentController from './../app/controllers/commentsController.js';

const router = express.Router();

router.put('/update/:id', commentController.update);
router.get('/product/:id', commentController.selectByIdProduct);
router.get('/edit/:id', commentController.edit);
router.delete('/:id', commentController.delete);
router.post('/add', commentController.add);
router.get('/', commentController.getAll);

export default router;
