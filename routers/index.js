import express from 'express';
import {testApi} from '../controllers';
import{createUser, viewUser, updateUser} from '../controllers/users'
import{authenticationMiddleware} from '../middlewares'


const router = express.Router();



router.get('/test',testApi);

//Rutas de usuario

router.post('/users',createUser); //Ruta para crear usuarios
router.get('/users/profile', authenticationMiddleware, viewUser); //Ruta para ver usuarios
router.put('/users/profile', authenticationMiddleware, updateUser); //Ruta para actualizar usuarios


export default router;