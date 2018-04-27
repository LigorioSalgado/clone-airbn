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

const getBookingsTravelerDB = (userId) => {
    return new Promise ((resolve, reject) => {
        Booking.find(
            {where:{UserId:userId},
            include:[
                {model:Estate, attributes: ['estate_name'], 
                    include:[{model:Address, attributes: ['pais','ciudad']},
                    {model:User, attributes: ['first_name', 'profile_image']}]},
            ]}).then((booking) => {
                resolve(booking);
            }).catch((err) => {
                reject(err);
            })
    })
}


export {
    getBookingTravelerLogin,
    createBookingDB,
    getBookingsTravelerDB
}