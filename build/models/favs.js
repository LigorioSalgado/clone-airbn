'use strict';

module.exports = function (sequelize, DataTypes) {
  var Favs = sequelize.define('Favs', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Favs.associate = function (models) {
    // associations can be defined here
  };
  return Favs;
};