import Order from '../models/order.js';

export const create = async (req, res) => {
  const order = await Order.create(req.body);

  res.status(201).json(order);
};

export const findOne = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (!order) return res.status(404).send();

  res.json(order);
};

export const findAll = async (_req, res) => {
  const orders = await Order.where();

  res.json(orders);
};
