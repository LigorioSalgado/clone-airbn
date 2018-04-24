
import  jwt  from 'jsonwebtoken';
import {SECRET_KEY} from '../config/config'
import bcrypt  from 'bcrypt-nodejs';
import db from '../models';
//Asi siempre se manda a llamar a la bd

const Estate = db.Estate; //db trae todas las tablas de BD
const User = db.User;

const viewAllEstates = (request,response) => {

    Estate.findAll({
        attributes: ['estate_name','description','score','price','available','photos','createdAt','updatedAt',],
        include:[{
            model: User,
            attributes: ['first_name', 'lastname', 'profile_image','description','score'],
        }]
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}

const viewAllEstatesUser = (request,response) => {
  
    Estate.findAll({
        attributes: ['estate_name','description','score','price','available','photos','createdAt','updatedAt',],
        include:[{
            model:User,
            attributes: ['first_name', 'lastname', 'profile_image','description','score'],
            where:{ 
                id: request.user.id
            }
        }]
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}

export {
        viewAllEstates, viewAllEstatesUser
    }