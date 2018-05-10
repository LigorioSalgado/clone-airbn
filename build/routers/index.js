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

//Rutas de usuario

//Documentacion necesaria para las rutas
/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Crear un nuevo usuario 
 *     produces:
 *       -  application/json
 *     parameters:
 *       - name: body
 *         description: JSON que contiene la informacion necesaria para crear un usuario.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: Nombre del usuario.
 *             lastname:
 *               type: string
 *               description: Apellido del usuario.
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña,cifrada, del usuario.
 *             phone_number:
 *               type: string
 *               description: Numero telefonico del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado. 
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: El ID del isuario.
 *             first_name:
 *               type: string
 *               description: Nombre del usuario.
 *             lastname:
 *               type: string
 *               description: Apellido del usuario.
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña,cifrada, del usuario.
 *             phone_number:
 *               type: string
 *               description: Numero telefonico del usuario.
 *             type:
 *               type: integer
 *               description: Tipo de usuario.
 *             updatedAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de la ultima actualizacion realizada.
 *             createdAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de creacion.
 *             profile_image:
 *               type: string
 *               description: Direccion de la imagen de perfil.
 *             description:
 *               type: string
 *               description: Descripcion del usuario.
 *             score:
 *               type: integer
 *               description: Puntuacion del usuario.
 *             user_pay:
 *               type: string
 *               description: Metodo de pago del usuario.
 *       400:
 *         description: Error de creacion
 */
router.post('/users/signup', _users.signUP); //Crear un nuevo usuario

/**
 * @swagger
 * /users/profile:
 *   get:
 *     description: Ver datos de un usuario 
 *     produces:
 *       -  application/json
 *     parameters:
 *       - name: headers
 *         in: headers
 *         description: Token de un usuario enviado para checar informacion del mismo. Formato->"Bearer token".
 *         required: true
 *     responses:
 *       200:
 *         description: Datos del usuario. 
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: Nombre del usuario.
 *             lastname:
 *               type: string
 *               description: Apellido del usuario.
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña,cifrada, del usuario.
 *             phone_number:
 *               type: string
 *               description: Numero telefonico del usuario.
 *             type:
 *               type: integer
 *               description: Tipo de usuario.
 *             profile_image:
 *               type: string
 *               description: Direccion de la imagen de perfil.
 *             description:
 *               type: string
 *               description: Descripcion del usuario.
 *             score:
 *               type: integer
 *               description: Puntuacion del usuario.
 *             user_pay:
 *               type: string
 *               description: Metodo de pago del usuario.
 *             updatedAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de la ultima actualizacion realizada.
 *             createdAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de creacion.
 *       400:
 *         description: Error, token no valido
 */
router.get('/users/profile', _middlewares.authenticationMiddleware, _users.viewUser); //Ruta para ver usuarios

/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     description: Actualiza los datos de un usuario
 *     produces:
 *       -  application/json
 *     parameters:
 *       - name: body
 *         description: JSON que contiene la informacion necesaria para actualizar un usuario.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: Nombre del usuario.
 *             lastname:
 *               type: string
 *               description: Apellido del usuario.
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             phone_number:
 *               type: string
 *               description: Numero telefonico del usuario.
 *             profile_image:
 *               type: string
 *               description: Direccion de la imagen de perfil.
 *             description:
 *               type: string
 *               description: Descripcion del usuario.
 *             score:
 *               type: integer
 *               description: Puntuacion del usuario.
 *             user_pay:
 *               type: string
 *               description: Metodo de pago del usuario.
 *     responses:
 *       200:
 *         description: Datos de usuario. 
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: Nombre del usuario.
 *             lastname:
 *               type: string
 *               description: Apellido del usuario.
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña,cifrada, del usuario.
 *             phone_number:
 *               type: string
 *               description: Numero telefonico del usuario.
 *             type:
 *               type: integer
 *               description: Tipo de usuario.
 *             updatedAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de la ultima actualizacion realizada.
 *             createdAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de creacion.
 *             profile_image:
 *               type: string
 *               description: Direccion de la imagen de perfil.
 *             description:
 *               type: string
 *               description: Descripcion del usuario.
 *             score:
 *               type: integer
 *               description: Puntuacion del usuario.
 *             user_pay:
 *               type: string
 *               description: Metodo de pago del usuario.
 *       400:
 *         description: Error, token no valido
 */
router.put('/users/profile', _middlewares.authenticationMiddleware, _users.updateUser); //Ruta para actualizar usuarios

/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Inicio de sesion de un usuario 
 *     produces:
 *       -  application/json
 *     parameters:
 *       - name: body
 *         description: JSON que contiene la informacion necesaria para que un usuario inicie sesion.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Correo electronico del usuario.
 *             password:
 *               type: string
 *               description: Contraseña,cifrada, del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado. 
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: token
 *               description: Token del usuario.
 *       400:
 *         description: Error de inicio de sesion
 */
router.post('/users/login', _users.login);

//Rutas bookings
router.post('/bookings', _middlewares.authenticationMiddleware, _bookings.createBooking);

/**
 * @swagger
 * /owner/booking:
 *   get:
 *     description: Get an specific booking of traveler
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
  *       - name: id
 *         description: Bearer $token
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Booking, Estate, Services, Adress, User(traveler-- fisrt_name, last_name, email, phone_number, profile_image)
 *       400:
 *         description: Bad request
 */
router.get('/users/booking/:id', _middlewares.authenticationMiddleware, _bookings.viewBookingTravelerLogin);
/**
 * @swagger
 * /bookings:
 *   post:
 *     description: Create booking
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *       - name: guest
 *         description: Number of guest of the booking.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: checkin
 *         description: Checkin of the booking
 *         in: formData
 *         required: true
 *         type: timestamp
 *       - name: checkout
 *         description: Checkout of the booking
 *         in: formData
 *         required: true
 *         type: timestamp
 *       - name: totalprice
 *         description: Totalprice (nights * price)
 *         in: formData
 *         required: true
 *         type: decimal
 * 
 *     responses:
 *       200:
 *         description: Booking created
 *       400:
 *         description: Bad request
 */
router.post('/traveler/bookings', _middlewares.authenticationMiddleware, _bookings.createBooking);
/**
 * @swagger
 * /traveler/bookings:
 *   get:
 *     description: Get all bookings of traveler
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *     responses:
 *       200:
 *         description: array of bookings that contains [estate_name, pais, ciudad, first_name, profile_image]
 *       400:
 *         description: Bad request
 */
router.get('/traveler/bookings', _middlewares.authenticationMiddleware, _bookings.getBookingsTraveler);
/**
 * @swagger
 * /traveler/booking:
 *   delete:
 *     description: Get all bookings of traveler
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *       - name: id
 *         description: BookingId
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Update Booking
 *       400:
 *         description: Bad request
 */
router.delete('/traveler/booking/:id', _middlewares.authenticationMiddleware, _bookings.cancellBookingTraveler);

/**
 * @swagger
 * /owner/booking:
 *   get:
 *     description: Get an specific booking of owner
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *       - name: id
 *         description: Bearer $token
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: {All information of Booking, Estate and User(traveler)}
 *       400:
 *         description: Bad request
 */
router.get('/owner/booking/:id', _middlewares.authenticationMiddleware, _bookings.confirmBookingOwner);
/**
 * @swagger
 * /owner/booking:
 *   put:
 *     description: Confirm a Booking
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *       - name: id
 *         description: Bearer $token
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Bad request
 */
router.put('/owner/booking/:id', _middlewares.authenticationMiddleware, _bookings.confirmBookingOwner);
/**
 * @swagger
 * /owner/booking:
 *   delete:
 *     description: Cancel a booking
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer $token
 *         in: headers
 *         required: true
 *         type: bearer
 *       - name: id
 *         description: Bearer $token
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Bad request
 */
router.delete('/owner/booking/:id', _middlewares.authenticationMiddleware, _bookings.cancellBookingOwner);

//Rutas de Propiedades
router.get('/estates/view', _estates.viewAllEstates); //Ruta para ver todas las propiedades
router.get('/estates/user/:id', _middlewares.authenticationMiddleware, _estates.viewEstateUser); //Ruta para ver todas las propiedades de un usuario

//Rutas Estates
router.post('/estates', _middlewares.authenticationMiddleware, _estates.createEstate);
router.get('/estates/search/', _estates.filterCityCountry);

router.get('/estates/cityLatLon/:city', _estates.retLatLon); // Ruta para regresar las longitudes y latitudes de una ciudad en especifico

router.get('/estates/:id', _estates.viewEstateDetail);

//Actualizar Propiedades del Usuario
router.put('/estate/:id', _middlewares.authenticationMiddleware, _estates.updateEstate);

//traer Propiedades de Ususario
router.get('/estates/user', _middlewares.authenticationMiddleware, _estates.getEstateUser);

exports.default = router;