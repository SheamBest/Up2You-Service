const { Tag } = require('../models');

exports.getAll = async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
};

exports.addTag = async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.create({ name });
  res.status(201).json(tag);
};