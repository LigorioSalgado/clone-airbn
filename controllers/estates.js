import {createEstateDB} from '../managers/estates';
import db from '../models';
//Asi siempre se manda a llamar a la bd

const {Estate, Service, Address, User} = db; //db trae todas las tablas de BD

const viewAllEstates = (request,response) => {

    Estate.findAll({
        attributes: ['estate_name','description','score','price','available','photos','createdAt','updatedAt','UserId'],
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}

const createEstate = (req,res) => {
    
    createEstateDB(req.body,req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
        res.json(err).status(400);
    })


}

const retLatLon = (request,response) => { //Regresa las longitudes y latitudes de una ciudad 
  
    Address.findAll({
            model: Address,
            attributes:['lat','long', 'EstateId'],
            where:{
                ciudad:request.params.city
            }
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}


export {
    viewAllEstates ,createEstate, retLatLon
}