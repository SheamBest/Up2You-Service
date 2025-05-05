module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      url: { type: DataTypes.STRING },
      is_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
  
    Service.associate = (models) => {
      Service.belongsTo(models.User, { foreignKey: 'added_by', as: 'author' });
  
      Service.belongsToMany(models.Tag, {
        through: models.ServiceTag,
        foreignKey: 'serviceId',
        as: 'tags'
      });
  
      Service.belongsToMany(models.User, {
        through: models.SavedService,
        foreignKey: 'serviceId',
        as: 'savedByUsers'
      });
    };
  
    return Service;
  };