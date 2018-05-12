import {createBookingDB, getBookingsTravelerDB,getBookingTravelerLogin, updateBookingOwnerDB, updateBookingTravelerDB, getBookingOwnerDB, putBookingScoreDB} from '../managers/bookings';
import db from '../models';
import {createOrder} from '../conekta'

const {Booking} = db;

const viewBookingTravelerLogin =(req,res) => {
    getBookingTravelerLogin(req.user.id, req.params.id).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{
        res.json(err).status(400);
    })
}
        

const createBooking = (req, res) =>{
    createOrder(req.body, req.user).then((response) => {
        createBookingDB(req.body, req.user.id).then((response) => {
            res.status(201).json(response);
        }).catch((err) => {
            res.json(err).status(400);
        })
    }).catch((err) => {
        console.log(err.http_code)
        res.status(err.http_code).json(err.details[0]);
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

const putBookingScore = (req, res) => {
    putBookingScoreDB(req.user.id, req.params.id, req.body.score).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{res.json(err).status(400)});
}

export{
    viewBookingTravelerLogin,
    createBooking, 
    getBookingsTraveler,
    cancellBookingTraveler,
    cancellBookingOwner,
    confirmBookingOwner,
    putBookingScore
}