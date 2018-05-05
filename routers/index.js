import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'

import {signUP, login, viewUser, updateUser} from '../controllers/users'


import {getBookings, createBooking, getBookingsTraveler, cancellBookingTraveler,
    viewBookingTravelerLogin, cancellBookingOwner, confirmBookingOwner} from '../controllers/bookings'

import {viewAllEstates, viewEstateUser,createEstate,getEstateUser,viewEstateDetail,
    retLatLon,updateEstate,filterCityCountry} from '../controllers/estates'

const router = express.Router();

router.get('/test',testApi);

//Rutas de usuario

/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Crear un nuevo usuario 
 *     produces:
 *       - application/json
 *     parameters:
 *       - first_name: username
 *         description: Nombre del usuario.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: Apellido del usuario.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Correo electrónico del usuario.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Contraseña del usuario.
 *         in: formData
 *         required: true
 *         type: string
*       - name: phone_number
 *         description: Telefono del usuario.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id del usuario.
 *                 first_name:
 *                   type: string
 *                   description: El nombre del usuario.
 *                 lastname:
 *                   type: string
 *                   description: El apellido del usuario.
 *                 email:
 *                   type: string
 *                   description: El email del usuario.
 *                 password:
 *                   type: string
 *                   description: La contraseña del usuario.
 *                 phone_number:
 *                   type: string
 *                   description: El telefono del usuario. 
 *       400:
 *         description: Error de creacion
 */


router.post('/users/signup',signUP); //Crear un nuevo usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
/**
 * @swagger
 * /login:
 *   post:
 *     description: Iniciar sesión
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email para iniciar sesión.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Contraseña del usuario.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/users/login',login);

router.get('/users/booking/:id', authenticationMiddleware, viewBookingTravelerLogin);
//Rutas bookings
router.post('/bookings',authenticationMiddleware,createBooking);
router.get('/traveler/bookings',authenticationMiddleware,getBookingsTraveler);
router.delete('/traveler/booking/:id', authenticationMiddleware, cancellBookingTraveler);

router.get('/owner/booking/:id', authenticationMiddleware, confirmBookingOwner);
router.put('/owner/booking/:id', authenticationMiddleware, confirmBookingOwner);
router.delete('/owner/booking/:id', authenticationMiddleware, cancellBookingOwner);

//Rutas de Propiedades
router.get('/estates/view', viewAllEstates); //Ruta para ver todas las propiedades
router.get('/estates/user/:id', authenticationMiddleware ,viewEstateUser); //Ruta para ver todas las propiedades de un usuario

//Rutas Estates
router.post('/estates',authenticationMiddleware,createEstate);
router.get('/estates/search/', filterCityCountry);

router.get('/estates/cityLatLon/:city' ,retLatLon); // Ruta para regresar las longitudes y latitudes de una ciudad en especifico

router.get('/estates/:id', viewEstateDetail);

//Actualizar Propiedades del Usuario
router.put('/estate/:id',authenticationMiddleware, updateEstate);

//traer Propiedades de Ususario
router.get('/estates/user', authenticationMiddleware, getEstateUser);

export default router;