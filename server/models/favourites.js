module.exports = (sequelize, DataTypes) => {
    const favourites = sequelize.define("favourites", {
        favourite_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }

    },{
        timestamps: false
      })
      return favourites;
}