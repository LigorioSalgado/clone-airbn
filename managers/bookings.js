import db from '../models';

const {Booking} = db;

const createBookingDB = (body, user) => {
    return new Promise ((resolve, reject) => {
        Booking.create({
            guest:body.guest,
            checkin:body.checkin,
            checkout: body.checkout,
            totalprice:body.totalprice,
            EstateId:body.EstateId,
            UserId:user
        }).then((booking) => {
            resolve(booking)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export{
    createBookingDB
}