import express from 'express';
import * as categories from '../controllers/categories.js';

const router = express.Router();

router.get('/:id', categories.findOne);
router.get('/', categories.findAll);
router.post('/', categories.create);
router.patch('/:id', categories.update);
router.delete('/:id', categories.remove);

export default router;
