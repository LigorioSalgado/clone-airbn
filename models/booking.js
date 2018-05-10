'use strict';
module.exports = (sequelize, DataTypes) => {
  var Booking = sequelize.define('Booking', {

    guest: {
      type:DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull:false,
      required: true,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull:false,
      required: true,
    },
    totalprice:{
       type:DataTypes.DECIMAL,
       allowNull:false,
       required: true,
    },

    score: {
      type:DataTypes.INTEGER, 
    },

    available: {
      type:DataTypes.INTEGER, 
      allowNull: false,
      required: true,
    }

  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};