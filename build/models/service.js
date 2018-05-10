'use strict';

module.exports = function (sequelize, DataTypes) {
  var Service = sequelize.define('Service', {

    wifi: DataTypes.BOOLEAN,
    bathrooms: DataTypes.INTEGER,
    estufa: DataTypes.BOOLEAN,
    parking: DataTypes.BOOLEAN,
    beds: DataTypes.INTEGER,
    refri: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN
  }, {});
  Service.associate = function (models) {
    // associations can be defined here
  };
  return Service;
};