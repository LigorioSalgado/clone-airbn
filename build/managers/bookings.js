'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateBookingOwnerDB = exports.getBookingOwnerDB = exports.updateBookingTravelerDB = exports.getBookingsTravelerDB = exports.createBookingDB = exports.getBookingTravelerLogin = undefined;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Estate = _models2.default.Estate,
    Address = _models2.default.Address,
    Service = _models2.default.Service,
    User = _models2.default.User,
    Booking = _models2.default.Booking;


var getBookingTravelerLogin = function getBookingTravelerLogin(bookingId, userId) {
    return new Promise(function (resolve, reject) {
        console.log(bookingId);
        console.log(userId);
        Booking.find({ where: { UserId: userId, id: bookingId },
            include: [{ model: Estate,
                include: [Address, Service, { model: User, attributes: ['first_name', 'lastname', 'email', 'phone_number', 'profile_image'] }] }] }).then(function (booking) {
            resolve(booking);
        }).catch(function (err) {
            reject(err);
        });
    });
};

var createBookingDB = function createBookingDB(body, user) {
    return new Promise(function (resolve, reject) {
        Booking.create({
            guest: body.guest,
            checkin: body.checkin,
            checkout: body.checkout,
            totalprice: body.totalprice,
            EstateId: body.EstateId,
            UserId: user,
            available: 0
        }).then(function (booking) {
            resolve(booking);
        }).catch(function (err) {
            reject(err);
        });
    });
};

var getBookingsTravelerDB = function getBookingsTravelerDB(userId) {
    return new Promise(function (resolve, reject) {
        Booking.findAll({ where: { UserId: userId },
            include: [{ model: Estate, attributes: ['estate_name'],
                include: [{ model: Address, attributes: ['pais', 'ciudad'] }, { model: User, attributes: ['first_name', 'profile_image'] }] }] }).then(function (booking) {
            resolve(booking);
        }).catch(function (err) {
            reject(err);
        });
    });
};

var updateBookingTravelerDB = function updateBookingTravelerDB(userId, bookingId, statusAvailable) {
    return new Promise(function (resolve, reject) {
        Booking.update({ available: statusAvailable }, { where: {
                UserId: userId,
                id: bookingId
            }
        }).then(function (booking) {
            resolve(getBookingTravelerLogin(bookingId, userId));
        }).catch(function (err) {
            reject(err);
        });
    });
};

var getBookingOwnerDB = function getBookingOwnerDB(userId, bookingId) {
    return new Promise(function (resolve, reject) {
        Booking.find({ where: { id: bookingId },
            include: [Estate, User]
        }).then(function (booking) {
            resolve(booking);
        }).catch(function (err) {
            reject(err);
        });
    });
};

var updateBookingOwnerDB = function updateBookingOwnerDB(userId, bookingId, statusAvailable) {
    return new Promise(function (resolve, reject) {
        getBookingOwnerDB(userId, bookingId).then(function (booking) {
            console.log(booking['Estate']['UserId']);
            if (booking['Estate']['UserId'] === userId) {
                Booking.update({ available: statusAvailable }, { where: {
                        id: bookingId
                    }
                }).then(function (update) {
                    getBookingOwnerDB(userId, bookingId).then(function (newBooking) {
                        resolve(newBooking);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject('{msg: Not found}');
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.getBookingTravelerLogin = getBookingTravelerLogin;
exports.createBookingDB = createBookingDB;
exports.getBookingsTravelerDB = getBookingsTravelerDB;
exports.updateBookingTravelerDB = updateBookingTravelerDB;
exports.getBookingOwnerDB = getBookingOwnerDB;
exports.updateBookingOwnerDB = updateBookingOwnerDB;