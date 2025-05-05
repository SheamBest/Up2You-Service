const { UserTag, SavedService, Service } = require('../models');

exports.getUserTags = async (req, res) => {
  const tags = await UserTag.findAll({ where: { userId: req.user.id } });
  res.json(tags);
};

exports.createUserTag = async (req, res) => {
  const { name } = req.body;
  const tag = await UserTag.create({ name, userId: req.user.id });
  res.status(201).json(tag);
};

exports.addTagToService = async (req, res) => {
  const { serviceId, tagId } = req.body;

  if (!serviceId || !tagId) {
    return res.status(400).json({ message: 'Необхідно передати serviceId і tagId' });
  }

  try {
    const tag = await UserTag.findOne({
      where: { id: tagId, userId: req.user.id }
    });

    if (!tag) {
      return res.status(404).json({ message: 'Тег не знайдено або не належить користувачу' });
    }

    let saved = await SavedService.findOne({
      where: { userId: req.user.id, serviceId }
    });

    if (!saved) {
      saved = await SavedService.create({
        userId: req.user.id,
        serviceId,
        userTagId: tagId
      });
    } else {
      saved.userTagId = tagId;
      await saved.save();
    }

    res.json({ message: 'Тег додано до збереженого сервісу', saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

exports.removeTagFromService = async (req, res) => {
  const { serviceId } = req.body;

  if (!serviceId) {
    return res.status(400).json({ message: 'Необхідно передати serviceId' });
  }

  try {
    const saved = await SavedService.findOne({
      where: { userId: req.user.id, serviceId }
    });

    if (!saved) {
      return res.status(404).json({ message: 'Збережений сервіс не знайдено' });
    }

    if (!saved.userTagId) {
      return res.status(400).json({ message: 'Цей сервіс не має тегу для видалення' });
    }

    saved.userTagId = null;
    await saved.save();

    res.json({ message: 'Тег видалено з збереженого сервісу' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};


exports.deleteUserTag = async (req, res) => {
  const { tagId } = req.params;

  try {
    const tag = await UserTag.findOne({
      where: { id: tagId, userId: req.user.id }
    });

    if (!tag) {
      return res.status(404).json({ message: 'Тег не знайдено або не належить користувачу' });
    }

    await SavedService.update(
      { userTagId: null },
      { where: { userTagId: tagId, userId: req.user.id } }
    );

    await tag.destroy();

    res.json({ message: 'Тег видалено і від’єднано від усіх сервісів' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка при видаленні тегу' });
  }
};

