import db from '../models';

const {Estate,Address,Service,User}  = db;


const getEstateDB = (id) =>{

    return new Promise((resolve,reject) => {

        Estate.find({where:{id:id},include:[Address,Service,User]}).then(
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

const updateEstateDB = (body,estate,user) =>{


    return new Promise((resolve,reject) => {
        Estate.update({
            estate_name:body.estate_name,
                description:body.description,
                price:body.price
        },{
            where:{
                id:estate,
                UserId:user
            }
        }).then((est) =>{
            Address.update({
               calle:body.address.calle,
               num_ext:body.address.num_ext,
               num_int:body.address.num_int,
               colonia:body.address.colonia,
               ciudad:body.address.ciudad,
               estado:body.address.estado,
               pais:body.address.pais,
               cp:body.address.cp,
               ref:body.address.ref
    
            },{
                where:{
                    EstateId:estate
                }
            }).then((address)=>{
                Service.update({
                    wifi:body.wifi,
                    bathrooms:body.bathrooms,
                    estufa:body.estufa,
                    parking:body.parking,
                    beds:body.beds,
                    refri:body.refri,
                    tv:body.tv
    
                },{
                    where:{
                        EstateId:estate
                    }
                }).then((service) => {
                    getEstateDB(estate).then((response) => {
                        resolve(response);
                      }).catch((err) =>{reject(err)} )
                }).catch((err)=>{reject(err)})
    
            }).catch((err)=>{reject(err)})
        }).catch((err)=>{reject(err)})
    });
    }


export {
    createEstateDB,
    updateEstateDB,
    getEstateDB
}