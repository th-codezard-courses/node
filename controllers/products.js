import mongoose from 'mongoose';
import fs from 'fs/promises';
import Product from '../models/product.js';

export const create = async (req, res) => {
  const { categoryId, ...body } = req.body;
  try {
    const product = await Product.create({
      ...body,
      category: mongoose.Types.ObjectId(categoryId),
      image: req.file.path,
    });

    res.status(201).json(product);
  } catch (ex) {
    if (ex.name === 'MongoServerError' && ex.code === 11000) {
      res.status(400).json({
        error: `Duplicate key: ${Object.keys(ex.keyValue).join(', ')}`,
      });
    }
  }
};

export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) return res.status(404).send();

    res.json(product);
  } catch (ex) {
    res.status(400).json({ error: ex.message });
  }
};

export const findAll = async (req, res) => {
  const { categoryId, search, status } = req.query;
  let conditions = [];

  if (status) conditions.push({ status });
  if (categoryId) {
    conditions.push({ category: new mongoose.Types.ObjectId(categoryId) });
  }
  if (search) {
    conditions.push({
      $or: [{ name: { $regex: search, $options: 'i' } }, { sku: search }],
    });
  }

  const query = conditions.length === 0 ? {} : { $and: conditions };
  const products = await Product.where(query).populate('category');

  res.json(products);
};

export const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (req.file) body.image = req.file.path;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send();

    const updatedProduct = await Product.findByIdAndUpdate(id, body);
    if (req.file) await fs.unlink(product.image);

    res.json(updatedProduct);
  } catch (ex) {
    if (ex.name === 'MongoServerError' && ex.code === 11000) {
      res.status(400).json({
        error: `Duplicate key: ${Object.keys(ex.keyValue).join(', ')}`,
      });
    }
  }
};

export const remove = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndDelete(id);

  res.status(204).send();
};
