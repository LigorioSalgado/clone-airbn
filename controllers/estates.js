import {createEstateDB} from '../managers/estates';



const createEstate = (req,res) => {
    
    createEstateDB(req.body,req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
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
    getEstateUser
}