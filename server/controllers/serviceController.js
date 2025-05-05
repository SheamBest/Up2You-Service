const { Service, Tag, User, SavedService, ServiceTag } = require('../models');
const { Op, Sequelize } = require('sequelize');

exports.getAll = async (req, res) => {
  const services = await Service.findAll({ include: ['tags', 'author'] });
  res.json(services);
};

exports.getRecommended = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: ['preferences'] });

    if (!user || !user.preferences.length) {
      return res.json([]);
    }

    const tagIds = user.preferences.map(tag => tag.id);

    const services = await Service.findAll({
      include: [{
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] },
        where: { id: tagIds }
      }],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('tags.id')), 'matchCount']
        ]
      },
      group: ['Service.id', 'tags.id'],
      order: [[Sequelize.literal('matchCount'), 'DESC']]
    });

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addService = async (req, res) => {
  try {
    const { name, description, url, tagIds } = req.body;

    const isVerified = req.user.role === 'admin' ? 1 : 0;

    const service = await Service.create({
      name,
      description,
      url,
      added_by: req.user.id,
      is_verified: isVerified 
    });

    await service.setTags(tagIds);

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while adding service' });
  }
};

exports.getOne = async (req, res) => {
  const service = await Service.findByPk(req.params.id, { include: ['tags', 'author'] });
  res.json(service);
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete services' });
  }

  try {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await SavedService.destroy({
      where: { serviceId: serviceId }
    });

    await ServiceTag.destroy({
      where: { serviceId: serviceId }
    });

    await service.destroy();

    res.json({ message: 'Service and its relations deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting service' });
  }
};

exports.findServicesByTags = async (req, res) => {
  const { tagIds } = req.body;

  try {
    const findOptions = {
      include: [{
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('tags.id')), 'matchCount']
        ]
      },
      group: ['Service.id', 'tags.id'],
      order: [[Sequelize.literal('matchCount'), 'DESC']]
    };

    if (Array.isArray(tagIds) && tagIds.length > 0) {
      findOptions.include[0].where = { id: { [Op.in]: tagIds } };
    }

    const services = await Service.findAll(findOptions);

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при пошуку сервісів' });
  }
};
