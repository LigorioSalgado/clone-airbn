'use strict';
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    calle: {
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    num_ext: {
      type:DataTypes.INTEGER,
      allowNull:false,
      required:true
    },
    num_int : DataTypes.INTEGER,
    colonia:  {
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    ciudad:  {
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    estado: {
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    pais:  {
      type:DataTypes.STRING,
      allowNull:false,
      required:true
    },
    cp: {
      type:DataTypes.INTEGER,
      allowNull:false,
      required:true
    },
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    ref: DataTypes.TEXT
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};