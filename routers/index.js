import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'


import {signUP, login, viewUser, updateUser} from '../controllers/users'

import {createEstate, getEstateUser, updateEstate} from '../controllers/estates';

const router = express.Router();

router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);

//Rutas de usuario
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
router.post('/users/login',login);


router.post('/estates',authenticationMiddleware,createEstate);

//Actualizar Propiedades del Usuario
router.put('/estate/:id',authenticationMiddleware, updateEstate);

//traer Propiedades de Ususario
router.get('/estates/user', authenticationMiddleware, getEstateUser);

export default router;