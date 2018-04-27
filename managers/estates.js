import db from '../models';
import Sequelize from 'sequelize'

var Op = Sequelize.Op;
const {Estate,Address,Service,User}  = db;


const getEstateDB = (id) =>{

    return new Promise((resolve,reject) => {

        Estate.find({where:{id:id},include:[Address,Service]}).then(
            (estate) => {
                resolve(estate)
            }).catch((err) => {
                reject(err);
            })
    })



}



const createEstateDB = (body,user) => {

    return new Promise((resolve,reject) => {

        Estate.create({
            estate_name:body.estate_name,
            description:body.description,
            price:body.price,
            available:true,
            UserId:user
        }).then((estate) => {
            body.address["EstateId"] = estate.id;
            Address.create(body.address).then((address) =>{
                body.services["EstateId"] = estate.id;
                Service.create(body.services).then((service) =>{
                  getEstateDB(estate.id).then((response) => {
                    resolve(response);
                  }).catch((err) =>{reject(err)} )
                }).catch((err) =>{
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        })

    });
}

const findCityOrCountry = (city,country) => {

    return new Promise((resolve,reject) => {

        Estate.findAll({
            attributes: ['id','estate_name','description','score','price','available','photos','createdAt','updatedAt','UserId'],
            include:[
            {
                model: Address,
                where: {
                    [Op.or]: [{ciudad:city}, {pais:country}]
                }
            }]
        }).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err);
        })

    });
}

const findCityAndCountry = (city,country) => {

    return new Promise((resolve,reject) => {

        Estate.findAll({
            attributes: ['id','estate_name','description','score','price','available','photos','createdAt','updatedAt','UserId'],
            include:[
            {
                model: Address,
                where: {
                    ciudad:city,
                    pais:country
                }
            }]
        }).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err);
        })

    });
}



export {
    createEstateDB, findCityOrCountry, findCityAndCountry
}