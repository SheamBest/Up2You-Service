// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
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

// models/service.js
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

// models/tag.js
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

// models/preference.js
module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    tagId: { type: DataTypes.INTEGER, allowNull: false }
  });

  return Preference;
};

// models/service_tag.js
module.exports = (sequelize, DataTypes) => {
  const ServiceTag = sequelize.define('ServiceTag', {
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    tagId: { type: DataTypes.INTEGER, allowNull: false }
  });

  return ServiceTag;
};

// models/saved_service.js
module.exports = (sequelize, DataTypes) => {
  const SavedService = sequelize.define('SavedService', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    custom_tags: { type: DataTypes.JSON, allowNull: true }
  });

  return SavedService;
};

// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
