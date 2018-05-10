import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'

import {signUP, login, viewUser, updateUser} from '../controllers/users'
import {getBookings, createBooking, getBookingsTraveler, cancellBookingTraveler, viewBookingTravelerLogin, cancellBookingOwner, confirmBookingOwner} from '../controllers/bookings'

import {viewAllEstates, viewEstateUser,createEstate,getEstateUser,viewEstateDetail,retLatLon,updateEstate,filterCityCountry} from '../controllers/estates'


const router = express.Router();

router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);

//Rutas de usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: created
 */
router.post('/users/login',login);

//Rutas bookings
router.post('/bookings',authenticationMiddleware,createBooking);

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
router.get('/users/booking/:id', authenticationMiddleware, viewBookingTravelerLogin);
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
router.post('/traveler/bookings',authenticationMiddleware,createBooking);
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
router.get('/traveler/bookings',authenticationMiddleware,getBookingsTraveler);
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
router.delete('/traveler/booking/:id', authenticationMiddleware, cancellBookingTraveler);

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
router.get('/owner/booking/:id', authenticationMiddleware, confirmBookingOwner);
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
router.put('/owner/booking/:id', authenticationMiddleware, confirmBookingOwner);
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