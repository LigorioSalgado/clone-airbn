'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.confirmBookingOwner = exports.cancellBookingOwner = exports.cancellBookingTraveler = exports.getBookingsTraveler = exports.createBooking = exports.viewBookingTravelerLogin = undefined;

var _bookings = require('../managers/bookings');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Booking = _models2.default.Booking;


var viewBookingTravelerLogin = function viewBookingTravelerLogin(req, res) {
    (0, _bookings.getBookingTravelerLogin)(req.user.id, req.params.id).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var createBooking = function createBooking(req, res) {
    (0, _bookings.createBookingDB)(req.body, req.user.id).then(function (response) {
        res.json(response).status(201);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var getBookingsTraveler = function getBookingsTraveler(req, res) {
    (0, _bookings.getBookingsTravelerDB)(req.user.id).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var cancellBookingTraveler = function cancellBookingTraveler(req, res) {
    (0, _bookings.updateBookingTravelerDB)(req.user.id, req.params.id, 2).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var getBookingOwner = function getBookingOwner(req, res) {
    (0, _bookings.getBookingOwnerDB)(req.user.id, req.params.id).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var cancellBookingOwner = function cancellBookingOwner(req, res) {
    (0, _bookings.updateBookingOwnerDB)(req.user.id, req.params.id, 3).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var confirmBookingOwner = function confirmBookingOwner(req, res) {
    (0, _bookings.updateBookingOwnerDB)(req.user.id, req.params.id, 1).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

exports.viewBookingTravelerLogin = viewBookingTravelerLogin;
exports.createBooking = createBooking;
exports.getBookingsTraveler = getBookingsTraveler;
exports.cancellBookingTraveler = cancellBookingTraveler;
exports.cancellBookingOwner = cancellBookingOwner;
exports.confirmBookingOwner = confirmBookingOwner;