module.exports = (sequelize, DataTypes) => {
    const service = sequelize.define("service", {
        service_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_service: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
        
    },{
        timestamps: false
      })
      return service;
}