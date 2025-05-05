module.exports = (sequelize, DataTypes) => {
    const ServiceTag = sequelize.define('ServiceTag', {
      serviceId: { type: DataTypes.INTEGER, allowNull: false },
      tagId: { type: DataTypes.INTEGER, allowNull: false }
    });
  
    return ServiceTag;
  };