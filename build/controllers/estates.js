'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAvaliable = exports.retLatLon = exports.viewEstateDetail = exports.viewEstateUser = exports.viewAllEstates = exports.updateEstate = exports.getEstateUser = exports.filterCityCountry = exports.createEstate = undefined;

var _estates = require('../managers/estates');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _bookings = require('./bookings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Asi siempre se manda a llamar a la bd

var Estate = _models2.default.Estate,
    Address = _models2.default.Address,
    Service = _models2.default.Service,
    User = _models2.default.User,
    Booking = _models2.default.Booking; //db trae todas las tablas de BD


var viewAllEstates = function viewAllEstates(request, response) {

    Estate.findAll({
        attributes: ['id', 'estate_name', 'description', 'score', 'price', 'available', 'photos', 'createdAt', 'updatedAt'],
        include: [{
            model: Address
        }]
    }).then(function (user) {
        response.json(user);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var viewEstateUser = function viewEstateUser(request, response) {

    Estate.findOne({
        attributes: ['estate_name', 'description', 'score', 'price', 'available', 'photos', 'createdAt', 'updatedAt'],
        where: {
            id: request.params.id
        },
        include: [{
            model: User,
            attributes: ['first_name', 'lastname', 'profile_image', 'description', 'score'],
            where: {
                id: request.user.id
            }
        }, { model: Address }, { model: Service }]
    }).then(function (user) {
        response.json(user);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var createEstate = function createEstate(req, res) {

    (0, _estates.createEstateDB)(req.body, req.user.id).then(function (response) {
        res.json(response).status(201);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var filterCityCountry = function filterCityCountry(request, res) {
    var _request$query = request.query,
        country = _request$query.country,
        city = _request$query.city;


    if (country == null || city == null) {
        (0, _estates.findCityOrCountry)(city, country).then(function (response) {
            res.json(response).status(201);
        }).catch(function (err) {
            res.json(err).status(400);
        });
    } else {
        (0, _estates.findCityAndCountry)(city, country).then(function (response) {
            res.json(response).status(201);
        }).catch(function (err) {
            res.json(err).status(400);
        });
    }
};

var updateEstate = function updateEstate(req, res) {
    (0, _estates.updateEstateDB)(req.body, req.params.id, req.user.id).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var retLatLon = function retLatLon(request, response) {
    //Regresa las longitudes y latitudes de una ciudad 

    Address.findAll({
        model: Address,
        attributes: ['lat', 'long', 'EstateId'],
        where: {
            ciudad: request.params.city
        }
    }).then(function (user) {
        response.json(user);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var getAvaliable = function getAvaliable(req, res) {
    console.log(req.params);
    Estate.findOne({
        model: Estate,
        attributes: ['price', 'id'],
        where: {
            id: req.params.id,
            available: true
        }
    }).then(function (estate) {
        Booking.findAll({
            // attributes:['checkin','checkout'],
            where: {
                EstateId: req.params.id
            }
        }).then(function (response) {
            response.map(function (data) {
                var checkIn = data.dataValues.checkin;
                var checkOut = data.dataValues.checkout;
                var oneDay = 24 * 60 * 60 * 1000;
                var diffDays = Math.round(Math.abs((checkOut.getTime() - checkIn.getTime()) / oneDay));
                console.log(checkIn);
                console.log(checkOut);
                console.log(diffDays);
                var priceResult = diffDays * data.dataValues.totalprice;
                console.log(priceResult);
            });
            res.json(response).status(200);
        }).catch(function (err) {
            response.status(400).json(err);
        });
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var viewEstateDetail = function viewEstateDetail(req, res) {
    (0, _estates.getEstateDB)(req.params.id).then(function (response) {
        res.json(response).status(200);
    }).catch(function (err) {
        res.json(err).status(400);
    });
};

var getEstateUser = function getEstateUser(req, res) {
    Estate.findAll({
        attributes: ['address_id', 'decription', 'score', 'price', 'available', 'photos'],
        where: { UserId: req.user.id }
    }).then();
};

exports.createEstate = createEstate;
exports.filterCityCountry = filterCityCountry;
exports.getEstateUser = getEstateUser;
exports.updateEstate = updateEstate;
exports.viewAllEstates = viewAllEstates;
exports.viewEstateUser = viewEstateUser;
exports.viewEstateDetail = viewEstateDetail;
exports.retLatLon = retLatLon;
exports.getAvaliable = getAvaliable;