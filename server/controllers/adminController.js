const { Service } = require('../models');

exports.verifyService = async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  service.is_verified = true;
  await service.save();
  res.json({ message: 'Service verified' });
};