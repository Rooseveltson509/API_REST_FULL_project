'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Ticket.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    })
    }
  };
  Ticket.init({    
    adminId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gain: DataTypes.STRING,
    etat: DataTypes.ENUM('distribue', 'valide', 'non-distribue'),
    code: DataTypes.STRING,
    magasin: DataTypes.STRING,
    validateAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};