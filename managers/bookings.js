import db from '../models';

const {Booking, Estate, User, Address, Service} = db;

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
                    include:[{model:Service, as:'Services', attributes: ['id','wifi']},
                    {model:User, attributes: ['first_name', 'profile_image']}]},
            ]}).then((booking) => {
                resolve(booking);
            }).catch((err) => {
                reject(err);
            })
    })
}

export{
    createBookingDB,
    getBookingsTravelerDB
}