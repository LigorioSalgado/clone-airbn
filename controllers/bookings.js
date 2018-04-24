import {createBookingDB} from '../managers/bookings';

const createBooking = (req, res) =>{
    createBookingDB(req.body, req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
        res.json(err).status(400);
    })
}

export{
    createBooking
}