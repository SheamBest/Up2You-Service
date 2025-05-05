module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Tag, {
      through: models.Preference,
      foreignKey: 'userId',
      as: 'preferences'
    });

    User.belongsToMany(models.Service, {
      through: models.SavedService,
      foreignKey: 'userId',
      as: 'savedServices'
    });
  };

  return User;
};
