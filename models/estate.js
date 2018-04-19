'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estate = sequelize.define('Estate', {
    ower_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    address_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    decription: DataTypes.TEXT,
    score: DataTypes.DECIMAL,
    price: {
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    photos: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Estate.associate = function(models) {
    // associations can be defined here
  };
  return Estate;
};