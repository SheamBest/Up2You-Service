module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false }
    });
  
    Tag.associate = (models) => {
      Tag.belongsToMany(models.User, {
        through: models.Preference,
        foreignKey: 'tagId',
        as: 'preferredByUsers'
      });
  
      Tag.belongsToMany(models.Service, {
        through: models.ServiceTag,
        foreignKey: 'tagId',
        as: 'services'
      });
    };
  
    return Tag;
  };