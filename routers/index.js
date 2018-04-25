import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'


import {signUP, login, viewUser, updateUser} from '../controllers/users'
import {getBookings, createBooking, getBookingsTraveler} from '../controllers/bookings'

import {createEstate} from '../controllers/estates';
import { getBookingsTravelerDB } from '../managers/bookings';

const router = express.Router();

router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);

//Rutas de usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
router.post('/users/login',login);

//Rutas bookings
router.post('/bookings',authenticationMiddleware,createBooking);
router.get('/bookings',authenticationMiddleware,getBookingsTraveler);

//Rutas Estates
router.post('/estates',authenticationMiddleware,createEstate);

export default router;