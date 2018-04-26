'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _middlewares = require('../middlewares');

var _users = require('../controllers/users');

var _bookings = require('../controllers/bookings');

var _estates = require('../controllers/estates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/test', _controllers.testApi);

//Crear usuario nuevo.
router.post('/users/signup', _users.signUP);

//Rutas de usuario
router.get('/users/profile', _middlewares.authenticationMiddleware, _users.viewUser); //Ruta para ver usuarios
router.put('/users/profile', _middlewares.authenticationMiddleware, _users.updateUser); //Ruta para actualizar usuarios
router.post('/users/login', _users.login);

//Rutas bookings
router.post('/bookings', _middlewares.authenticationMiddleware, _bookings.createBooking);

//Rutas de Propiedades
router.get('/estates/view', _estates.viewAllEstates); //Ruta para ver todas las propiedades
router.get('/estates/user/:id', _middlewares.authenticationMiddleware, _estates.viewEstateUser); //Ruta para ver todas las propiedades de un usuario
router.post('/estates', _middlewares.authenticationMiddleware, _estates.createEstate);
router.get('/estates/:id', _estates.viewEstateDetail);

//traer Propiedades de Ususario
router.get('/getestate', _middlewares.authenticationMiddleware, _estates.getEstateUser);

exports.default = router;