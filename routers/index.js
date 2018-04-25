import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'


import {signUP, login, viewUser, updateUser} from '../controllers/users'
import {viewAllEstates, viewEstateUser,createEstate} from '../controllers/estates'



const router = express.Router();

router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);

//Rutas de usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
router.post('/users/login',login);

//Rutas de Propiedades
router.get('/estates/view', viewAllEstates); //Ruta para ver todas las propiedades
router.get('/estates/user/:id', authenticationMiddleware ,viewEstateUser); //Ruta para ver todas las propiedades de un usuario
router.get('/estates/view', viewAllEstates);
router.post('/estates',authenticationMiddleware,createEstate);

export default router;