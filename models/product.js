import mongoose from 'mongoose';
import slash from 'slash';

const { Schema } = mongoose;

export const statuses = {
  InStock: 1,
  OutOfStock: 2,
};

const productSchema = new Schema({
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: String,
  price: {
    type: Number,
    min: 0,
  },
  status: {
    type: Number,
    required: true,
    default: statuses.InStock,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
    converted.image = slash(doc.image);
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
