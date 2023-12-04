module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        user_id: {
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
            allowNull: false,
            required: true
        },
        card_number: {
            type: DataTypes.INTEGER(16),
            allowNull: true
        },
        funds_number: {
            type: DataTypes.INTEGER(9),
            allowNull: false
        },
    },{
        timestamps: false
      })
      return user;
}