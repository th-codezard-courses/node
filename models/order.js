import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  name: String,
  tel: String,
  products: [
    {
      sku: { type: String, required: true },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
