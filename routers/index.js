import express from 'express';
import {testApi} from '../controllers';

import{authenticationMiddleware} from '../middlewares'


import {createUser, login, viewUser, updateUser} from '../controllers/users'

const router = express.Router();


router.get('/test',testApi);

//Rutas de usuario

router.post('/users',createUser); //Ruta para crear usuarios
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios
router.post('/users/login',login);


export default router;