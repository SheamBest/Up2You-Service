module.exports = (sequelize, DataTypes) => {
    const administrator = sequelize.define('administrator', {
        admin_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone_number: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
            unique: true
        },
        second_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps: false
      })
      return administrator;
}