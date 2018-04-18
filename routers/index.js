import express from 'express';
import {testApi} from '../controllers';
import {signUP} from '../controllers/users'


const router = express.Router();


router.get('/test',testApi);

//Crear usuario nuevo.
router.post('/users/signup',signUP);


router.put('/users/profile');

export default router;