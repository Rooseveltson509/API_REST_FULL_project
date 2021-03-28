'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        models.User.hasMany(models.Ticket)
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin'),
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    confirmationToken: DataTypes.STRING,
    confirmedAt: DataTypes.DATE,
    resetToken: DataTypes.STRING,
    resetAt: DataTypes.DATE,
    expiredAt: DataTypes.DATE,
    rememberToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};