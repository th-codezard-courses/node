import express from 'express';
import * as orders from '../controllers/orders.js';

const router = express.Router();

router.get('/:id', orders.findOne);
router.get('/', orders.findAll);
router.post('/', orders.create);

export default router;
