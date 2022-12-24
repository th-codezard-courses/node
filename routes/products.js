import express from 'express';
import multer from 'multer';
import * as products from '../controllers/products.js';

const router = express.Router();
const avatarUploader = multer({
  dest: 'uploads/products/',
}).single('image');

router.get('/:id', products.findOne);
router.get('/', products.findAll);
router.post('/', avatarUploader, products.create);
router.patch('/:id', avatarUploader, products.update);
router.delete('/:id', products.remove);

export default router;
