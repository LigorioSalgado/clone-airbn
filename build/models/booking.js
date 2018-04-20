'use strict';

module.exports = function (sequelize, DataTypes) {
  var Booking = sequelize.define('Booking', {
    estate_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guest: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true
    },
    totalprice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {});
  Booking.associate = function (models) {
    // associations can be defined here
  };
  return Booking;
};