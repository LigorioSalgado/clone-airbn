'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    estate_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    wifi: DataTypes.BOOLEAN,
    baños: DataTypes.INTEGER,
    estufa: DataTypes.BOOLEAN,
    parking: DataTypes.BOOLEAN,
    beds: DataTypes.INTEGER,
    refri: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};