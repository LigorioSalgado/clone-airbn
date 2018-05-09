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
router.post('/users/signup',signUP); //Crear un nuevo usuario

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
 *         description: Error de inicio de sesion
 */
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios

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