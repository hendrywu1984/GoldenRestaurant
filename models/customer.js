'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Customer extends Model{

  }

  Customer.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    MembershipId: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize
  })
  
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsTo(models.Membership)
    Customer.hasMany(models.Order)
  };
  return Customer;
};