"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEstateDB = exports.createEstateDB = undefined;

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Estate = _models2.default.Estate,
    Address = _models2.default.Address,
    Service = _models2.default.Service,
    User = _models2.default.User;


var getEstateDB = function getEstateDB(id) {

    return new Promise(function (resolve, reject) {

        Estate.find({ where: { id: id }, include: [Address, Service, User] }).then(function (estate) {
            resolve(estate);
        }).catch(function (err) {
            reject(err);
        });
    });
};

var createEstateDB = function createEstateDB(body, user) {

    return new Promise(function (resolve, reject) {

        Estate.create({
            estate_name: body.estate_name,
            description: body.description,
            price: body.price,
            available: true,
            UserId: user
        }).then(function (estate) {
            body.address["EstateId"] = estate.id;
            Address.create(body.address).then(function (address) {
                body.services["EstateId"] = estate.id;
                Service.create(body.services).then(function (service) {
                    getEstateDB(estate.id).then(function (response) {
                        resolve(response);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.createEstateDB = createEstateDB;
exports.getEstateDB = getEstateDB;