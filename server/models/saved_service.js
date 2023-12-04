module.exports = (sequelize, DataTypes) => {
    const saved_service = sequelize.define("saved_service", {
        saved_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
    },{
        timestamps: false
      })
      return saved_service;
}