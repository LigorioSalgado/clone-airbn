'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewUser = exports.updateUser = exports.login = exports.signUP = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config/config');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Asi siempre se manda a llamar a la bd

var User = _models2.default.User; //db trae todas las tablas de BD

var signUP = function signUP(request, response) {

    User.create({
        first_name: request.body.first_name,
        lastname: request.body.lastname,
        email: request.body.email,
        password: request.body.password,
        phone_number: request.body.phone_number,
        type: 1
    }).then(function (user) {
        response.json(user).status(200);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var viewUser = function viewUser(request, response) {

    User.findOne({
        attributes: ['first_name', 'lastname', 'email', 'password', 'phone_number', 'type'],
        where: {
            email: request.user.email
        }
    }).then(function (user) {
        response.json(user);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var updateUser = function updateUser(request, response) {

    User.update({
        first_name: request.body.first_name,
        lastname: request.body.lastname,
        email: request.body.email,
        phone_number: request.body.phone_number,
        type: 1 }, {
        where: {
            email: request.user.email
        }
    }).then(function (user) {
        response.json(user);
    }).catch(function (err) {
        response.status(400).json(err);
    });
};

var cryptPassword = function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function (resolve, reject) {
        _bcryptNodejs2.default.genSalt(10, function (err, salt) {
            // Encrypt password using bycrpt module
            if (err) return reject(err);

            _bcryptNodejs2.default.hash(password, salt, null, function (err, hash) {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    });
};

var login = function login(req, res) {
    User.findOne({ where: { email: req.body.email } }).then(function (user) {
        _bcryptNodejs2.default.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                var newUser = {
                    email: user.email,
                    name: user.first_name + ' ' + user.lastname,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
                };
                var token = _jsonwebtoken2.default.sign(newUser, _config.SECRET_KEY);
                return res.status(200).json({ token: token });
            } else {
                return res.status(400).json({ message: "Contraseña no coincide" });
            }
        });
    }).catch(function () {
        return res.status(400).json({ message: "El usuario no existe" });
    });
};

exports.signUP = signUP;
exports.login = login;
exports.updateUser = updateUser;
exports.viewUser = viewUser;