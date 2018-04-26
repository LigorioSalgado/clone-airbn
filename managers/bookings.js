import db from '../models';

const {Estate,Address,Service,User,Booking}  = db;

const getBookingTravelerLogin = (bookingId, userId) => {
    return new Promise ((resolve, reject)=> {
        console.log(bookingId)
        console.log(userId)
        Booking.find (
            {where : {UserId:userId , id:bookingId},
            include:[
                {model:Estate,
                include:[Address,Service, {model:User, attributes:['first_name', 'lastname', 'email', 'phone_number','profile_image']}]},
            ]}).then((booking)=>{
                resolve(booking)
            }).catch((err)=>{
                reject(err)
            })
    })
}


export {
    getBookingTravelerLogin
}