import {createEstateDB, getEstateDB} from '../managers/estates';



const createEstate = (req,res) => {
    
    createEstateDB(req.body,req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
        res.json(err).status(400);
    })


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


export {
    createEstate,
    viewEstateDetail
}