

import {createEstateDB, getEstateDB,updateEstateDB,findCityAndCountry, findCityOrCountry} from '../managers/estates';

import db from '../models';
//Asi siempre se manda a llamar a la bd

const {Estate, Address, Service, User} = db; //db trae todas las tablas de BD




const viewAllEstates = (request,response) => {

    Estate.findAll({
        attributes: ['id','estate_name','description','score','price','available','photos','createdAt','updatedAt',],
        include:[{
            model: Address
        }]
    }).then((user)=>{
        response.json(user)
    }).catch((err)=>{
        response.status(400).json(err);

    });
}

const viewEstateUser = (request,response) => {
  
    Estate.findOne({
        attributes: ['estate_name','description','score','price','available','photos','createdAt','updatedAt',],
        where:{ 
            id: request.params.id
        },
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


const createEstate = (req,res) => {
    
    createEstateDB(req.body,req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
        res.json(err).status(400);
    });


}

const filterCityCountry = (request,res) => {

    const {country,city} =  request.query

    if(country==null || city==null){
        findCityOrCountry(city,country).then((response) => {
            res.json(response).status(201);
        }).catch((err) => {
            res.json(err).status(400);
        });
    }else{
        findCityAndCountry(city,country).then((response) => {
            res.json(response).status(201);
        }).catch((err) => {
            res.json(err).status(400);
        });
    }

}

const updateEstate = (req,res) =>{
    updateEstateDB(req.body, req.params.id, req.user.id).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{
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




const viewEstateDetail = (req,res)=>{
    getEstateDB(
        req.params.id
    ).then((response)=>{
        res.json(response).status(200);
    }).catch ((err)=>{
        res.json(err).status(400);
    })
}


const getEstateUser = (req, res) => {
    Estate.findAll({
       attributes: ['address_id','decription','score','price','available','photos'],
       where:{ UserId: req.user.id } 
    }).then()
}

export {
    createEstate, 
    filterCityCountry
    createEstate,
    getEstateUser,
    updateEstate,
    viewAllEstates,
    viewEstateUser,
    viewEstateDetail,
    retLatLon
}

