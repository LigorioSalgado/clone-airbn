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
            UserId:user,
            available:0
        }).then((booking) => {
            resolve(booking)
        }).catch((err) =>{
            reject(err)
        })
    })
}

const getBookingsTravelerDB = (userId) => {
    return new Promise ((resolve, reject) => {
        Booking.findAll(
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

const updateBookingTravelerDB = (userId, bookingId, statusAvailable) => {
    return new Promise ((resolve, reject) => {
        Booking.update({available: statusAvailable},
            {where: {
                UserId:userId,
                id:bookingId
            }
        }).then((booking) => {
            resolve(getBookingTravelerLogin(bookingId, userId))
        }).catch((err) => {
            reject(err)
        })
    })
}

const getBookingOwnerDB = (userId, bookingId) => {
    return new Promise ((resolve, reject) => {
        Booking.find(
            {where:{id:bookingId},
            include:[Estate,User]
        }).then((booking) => {
            resolve(booking)
        }).catch((err) => {
            reject(err)
        })
    })
}

const updateBookingOwnerDB = (userId, bookingId, statusAvailable) => {
    return new Promise ((resolve, reject) => {
        getBookingOwnerDB(userId, bookingId).then((booking) => {
            console.log(booking['Estate']['UserId']);
            if(booking['Estate']['UserId']===userId){
                Booking.update({available: statusAvailable},
                    {where: {
                        id:bookingId
                    }
                }).then((update) => {
                    getBookingOwnerDB(userId, bookingId).then((newBooking) => {
                        resolve(newBooking)
                    }).catch((err) => {
                        reject(err)
                    })
                }).catch((err) => {
                    reject(err)
                })
            }else{
                reject('{msg: Not found}')
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export {
    getBookingTravelerLogin,
    createBookingDB,
    getBookingsTravelerDB,
    updateBookingTravelerDB,
    getBookingOwnerDB,
    updateBookingOwnerDB
}