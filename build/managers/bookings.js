'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBookingDB = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Booking = _models2.default.Booking;


var createBookingDB = function createBookingDB(body, user) {
    return new Promise(function (resolve, reject) {
        Booking.create({
            guest: body.guest,
            checkin: body.checkin,
            checkout: body.checkout,
            totalprice: body.totalprice,
            EstateId: body.EstateId,
            UserId: user
        }).then(function (booking) {
            resolve(booking);
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.createBookingDB = createBookingDB;