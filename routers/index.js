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
 *         description: Error, token no valido
 */
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios

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


/**
 * @swagger
 * /estates/search/:
 *   get:
 *     description: Busca propiedas por-> Ciudad | Pais | Ciudad y pais 
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Query parameter -> City (Ciudad).
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Query parameter -> Country (Pais).
 *     responses:
 *       200:
 *         description: Coincidencias encontradas. 
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Id de la propiedad.
 *             estate_name:
 *               type: string
 *               description: Nombre de la propiedad.
 *             description:
 *               type: string
 *               description: Descripcion de la propiedad.
 *             score:
 *               type: decimal
 *               description: Evaluacion de la propiedad.
 *             price:
 *               type: decimal
 *               description: Precio de la propiedad.
 *             available:
 *               type: boolean
 *               description: Disponibilidad de la propiedad.
 *             photos:
 *               type: string
 *               description: URL de las fotos de la propiedad.
 *             createdAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de creacion.
 *             updatedAt:
 *               type: timestamp with time zone
 *               description: Fecha y hora de la ultima actualizacion realizada.
 *             UserId:
 *               type: integer
 *               description: Id del dueño de la propiedad.
 *             Address:
 *               type: object
 *               description: Direccion del usuario.
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Id de la direccion de la propiedad
 *                 calle:
 *                   type: integer
 *                   description: Calle de la propiedad.
 *                 num_ext:
 *                   type: string
 *                   description: Numero exterior de la propiedad.
 *                 num_int:
 *                   type: string
 *                   description: Numero interior de la propiedad.
 *                 colonia:
 *                   type: string
 *                   description: Colonia donde se encuentra la propiedad.
 *                 ciudad:
 *                   type: string
 *                   description: Ciudad donde se encuentra la propiedad.
 *                 estado:
 *                   type: string
 *                   description: Estado donde se encuentra la propiedad.
 *                 pais:
 *                   type: string
 *                   description: Pais donde se encuentra la propiedad.
 *                 cp:
 *                   type: integer
 *                   description: Codigo de la propiedad.
 *                 lat:
 *                   type: float
 *                   description: Latitud de la propiedad.
 *                 lon:
 *                   type: float
 *                   description: Longitud de la propiedad.
 *                 ref:
 *                   type: text
 *                   description: Referencias para encontrar la propiedad.
 *                 createdAt:
 *                   type: timestamp with time zone
 *                   description: Fecha y hora de creacion.
 *                 updatedAt:
 *                   type: timestamp with time zone
 *                   description: Fecha y hora de la ultima actualizacion realizada.
 *                 EstateId:
 *                   type: integer
 *                   description: Id de la propiedad a la que la direccion pertenece.
 *       400:
 *         description: No hay coincidencias
 */
router.get('/estates/search/', filterCityCountry);//Buscador por ciudad o pais

router.get('/estates/cityLatLon/:city' ,retLatLon); // Ruta para regresar las longitudes y latitudes de una ciudad en especifico

router.get('/estates/:id', viewEstateDetail);//Arturo

//Actualizar Propiedades del Usuario
router.put('/estate/:id',authenticationMiddleware, updateEstate);//Arturo

//traer Propiedades de Ususario
router.get('/estates/user', authenticationMiddleware, getEstateUser);//Arturo

export default router;