import {getBookingTravelerLogin} from '../managers/bookings';

const viewBookingTravelerLogin =(req,res) => {
    getBookingTravelerLogin(req.user.id, req.params.id).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{
        res.json(err).status(400);
    })
}

export{
    viewBookingTravelerLogin
}