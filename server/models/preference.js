module.exports = (sequelize, DataTypes) => {
    const Preference = sequelize.define('Preference', {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      tagId: { type: DataTypes.INTEGER, allowNull: false }
    });
  
    return Preference;
  };