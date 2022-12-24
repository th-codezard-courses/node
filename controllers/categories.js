import Category from '../models/category.js';

export const create = async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json(category);
};

export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) return res.status(404).send();

    res.json(category);
  } catch (ex) {
    res.status(400).json({ error: ex.message });
  }
};

export const findAll = async (_req, res) => {
  const categorys = await Category.where();

  res.json(categorys);
};

export const update = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndUpdate(id, req.body);

  if (!category) return res.status(404).send();

  res.json(category);
};

export const remove = async (req, res) => {
  const id = req.params.id;

  await Category.findByIdAndDelete(id);

  res.status(204).send();
};
