module.exports = (sequelize, DataTypes) => {
  const SavedService = sequelize.define('SavedService', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    userTagId: { type: DataTypes.INTEGER, allowNull: true }
  });

  SavedService.associate = (models) => {
    SavedService.belongsTo(models.User, { foreignKey: 'userId' });
    SavedService.belongsTo(models.Service, { foreignKey: 'serviceId' });
    SavedService.belongsTo(models.UserTag, { foreignKey: 'userTagId', as: 'userTag' });
  };

  return SavedService;
};