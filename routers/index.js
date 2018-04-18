import express from 'express';
import {testApi} from '../controllers';
import {createUser, login} from '../controllers/users'

const router = express.Router();


router.get('/test',testApi);

router.post('/users',createUser);

router.put('/users/profile');

router.post('/users/login',login);

export default router;