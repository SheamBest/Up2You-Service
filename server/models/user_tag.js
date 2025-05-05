module.exports = (sequelize, DataTypes) => {
  const UserTag = sequelize.define('UserTag', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
  });

  UserTag.associate = (models) => {
    UserTag.belongsTo(models.User, { foreignKey: 'userId' });
    UserTag.belongsToMany(models.Service, {
      through: models.SavedService,
      foreignKey: 'userTagId',
      otherKey: 'serviceId',
      as: 'taggedServices'
    });
  };

  return UserTag;
};