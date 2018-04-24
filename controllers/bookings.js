import db from '../models';

const Booking = db.Booking;

const getBookings = (request, response) => {
    Booking.findAll({
        /*where: {
            UserId:request.body.id
        }*/
    }).then((bookings)=>{
        response.json(bookings)
    }).catch((err)=>{
        response.status(404).json({message:"No existen reservaciones con este usuario"});

    });
}

export{
    getBookings
}