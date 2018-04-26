'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _middlewares = require('../middlewares');

var _users = require('../controllers/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/test', _controllers.testApi);

//Crear usuario nuevo.
router.post('/users/signup', _users.signUP);

//Rutas de usuario
router.get('/users/profile', _middlewares.authenticationMiddleware, _users.viewUser); //Ruta para ver usuarios
router.put('/users/profile', _middlewares.authenticationMiddleware, _users.updateUser); //Ruta para actualizar usuarios
router.post('/users/login', _users.login);

exports.default = router;