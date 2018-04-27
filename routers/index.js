import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'

import {viewBookingTravelerLogin} from '../controllers/bookings'

import {signUP, login, viewUser, updateUser} from '../controllers/users'
import {getBookings, createBooking, getBookingsTraveler} from '../controllers/bookings'

import {viewAllEstates, viewEstateUser,createEstate,getEstateUser,viewEstateDetail,retLatLon,updateEstate} from '../controllers/estates'



const router = express.Router();

router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);

//Rutas de usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
router.post('/users/login',login);

router.get('/users/booking/:id', authenticationMiddleware, viewBookingTravelerLogin);
//Rutas bookings
router.post('/bookings',authenticationMiddleware,createBooking);
router.get('/bookings',authenticationMiddleware,getBookingsTraveler);

//Rutas de Propiedades
router.get('/estates/view', viewAllEstates); //Ruta para ver todas las propiedades
router.get('/estates/user/:id', authenticationMiddleware ,viewEstateUser); //Ruta para ver todas las propiedades de un usuario

//Rutas Estates
router.post('/estates',authenticationMiddleware,createEstate);
router.get('/estates/cityLatLon/:city' ,retLatLon); // Ruta para regresar las longitudes y latitudes de una ciudad en especifico

router.get('/estates/:id', viewEstateDetail);

//Actualizar Propiedades del Usuario
router.put('/estate/:id',authenticationMiddleware, updateEstate);

//traer Propiedades de Ususario
router.get('/estates/user', authenticationMiddleware, getEstateUser);

export default router;