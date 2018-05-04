'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewEstateDetail = exports.viewEstateUser = exports.viewAllEstates = exports.getEstateUser = exports.createEstate = undefined;

var _estates = require('../managers/estates');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Asi siempre se manda a llamar a la bd

var Estate = _models2.default.Estate,
    Address = _models2.default.Address,
    Service = _models2.default.Service,
    User = _models2.default.User; //db trae todas las tablas de BD


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
exports.getEstateUser = getEstateUser;
exports.viewAllEstates = viewAllEstates;
exports.viewEstateUser = viewEstateUser;
exports.viewEstateDetail = viewEstateDetail;