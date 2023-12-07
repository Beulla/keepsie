const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('Roles', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Role;
};
