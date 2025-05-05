const { User, Tag, UserTag, Service, SavedService, Preference } = require('../models');

exports.getPreferences = async (req, res) => {
  const user = await User.findByPk(req.user.id, { include: ['preferences'] });
  res.json(user.preferences);
};

exports.createPreferences = async (req, res) => {
  const { tagId } = req.body;
  const user = await User.findByPk(req.user.id);
  const tag = await Tag.findByPk(tagId);
  await Preference.create({
    userId: user.id,
    tagId: tag.id
  });

  res.json({ message: 'Preference created successfully' });
};

exports.deletePreference = async (req, res) => {
  const { tagId } = req.params;
  const userId = req.user.id;
  try {
    const preference = await Preference.findOne({
      where: {
        userId: userId,
        tagId: tagId
      }
    });

    if (!preference) {
      return res.status(404).json({ message: 'Preference not found for this user and tag' });
    }

    // Видаляємо запис
    await preference.destroy();

    res.json({ message: 'Preference removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while deleting preference' });
  }
};

exports.getSavedServices = async (req, res) => {
  try {
    const saved = await SavedService.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Service,
          attributes: ['id', 'name', 'description', 'url', 'is_verified', 'added_by', 'createdAt', 'updatedAt']
        },
        {
          model: UserTag,
          as: 'userTag',
          attributes: ['id', 'name']
        }
      ]
    });

    const services = saved.map(entry => ({
      id: entry.Service.id,
      name: entry.Service.name,
      description: entry.Service.description,
      url: entry.Service.url,
      is_verified: entry.Service.is_verified,
      added_by: entry.Service.added_by,
      createdAt: entry.Service.createdAt,
      updatedAt: entry.Service.updatedAt,
      userTagId: entry.userTag ? entry.userTag.id : null,
      userTagName: entry.userTag ? entry.userTag.name : null
    }));

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при отриманні збережених сервісів' });
  }
};

exports.saveService = async (req, res) => {
  const { serviceId } = req.body;

  if (!serviceId) {
    return res.status(400).json({ message: 'serviceId обовʼязковий' });
  }

  try {
    await SavedService.findOrCreate({
      where: { userId: req.user.id, serviceId },
      defaults: { userId: req.user.id, serviceId },
    });

    res.status(201).json({ message: 'Сервіс збережено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при збереженні сервісу' });
  }
};

exports.deleteSavedService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const deleted = await SavedService.destroy({
      where: { userId: req.user.id, serviceId },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Сервіс не знайдено у збережених' });
    }

    res.json({ message: 'Сервіс видалено зі збережених' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при видаленні сервісу' });
  }
};

