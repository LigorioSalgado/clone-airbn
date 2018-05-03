'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBooking = undefined;

var _bookings = require('../managers/bookings');

var createBooking = function createBooking(req, res) {
    (0, _bookings.createBookingDB)(req.body, req.user.id).then(function (response) {
        res.json(response).status(201);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

exports.createBooking = createBooking;