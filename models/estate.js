'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estate = sequelize.define('Estate', {

    estate_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    description: DataTypes.TEXT,

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