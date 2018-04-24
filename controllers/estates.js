
import  jwt  from 'jsonwebtoken';
import {SECRET_KEY} from '../config/config'
import bcrypt  from 'bcrypt-nodejs';
import db from '../models';
//Asi siempre se manda a llamar a la bd

const {Estate, Address, Service, User} = db; //db trae todas las tablas de BD


const viewAllEstates = (request,response) => {

    Estate.findAll({
        attributes: ['estate_name','description','score','price','available','photos','createdAt','updatedAt',],
        include:[{
            model: Address
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
        },{model: Address},{model: Service}]
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}

export {
        viewAllEstates, viewAllEstatesUser
    }