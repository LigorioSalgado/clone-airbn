import {createBookingDB, getBookingsTravelerDB,getBookingTravelerLogin, updateBookingOwnerDB, updateBookingTravelerDB, getBookingOwnerDB} from '../managers/bookings';
import db from '../models';

const {Booking} = db;

const viewBookingTravelerLogin =(req,res) => {
    getBookingTravelerLogin(req.user.id, req.params.id).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{res.json(err).status(400)})
}

const createBooking = (req, res) =>{
    createBookingDB(req.body, req.user.id).then((response) => {
        res.json(response).status(201);
    }).catch((err) => {
        res.json(err).status(400);
    })
}

const getBookingsTraveler = (req, res) =>{
    getBookingsTravelerDB(req.user.id).then((response) => {
        res.json(response).status(200);
    }).catch((err) => {
        res.json(err).status(400);
    })
}

const cancellBookingTraveler = (req, res) => {
    updateBookingTravelerDB(req.user.id, req.params.id, 2).then((response) => {
        res.json(response).status(200)
    }).catch((err) => {
        res.json(err).status(400)
    })
}

const getBookingOwner = (req, res) => {
    getBookingOwnerDB(req.user.id, req.params.id).then((response) => {
        res.json(response).status(200)
    }).catch((err) => {
        res.json(err).status(400)
    })
}

const cancellBookingOwner = (req, res) => {
    updateBookingOwnerDB(req.user.id, req.params.id, 3).then((response) => {
        res.json(response).status(200)
    }).catch((err) => {
        res.json(err).status(400)
    })
}

const confirmBookingOwner = (req, res) => {
    updateBookingOwnerDB(req.user.id, req.params.id, 1).then((response) => {
        res.json(response).status(200)
    }).catch((err) => {
        res.json(err).status(400)
    })
}

export{
    viewBookingTravelerLogin,
    createBooking, 
    getBookingsTraveler,
    cancellBookingTraveler,
    cancellBookingOwner,
    confirmBookingOwner
}