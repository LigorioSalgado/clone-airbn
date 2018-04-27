import {createBookingDB, getBookingsTravelerDB,getBookingTravelerLogin} from '../managers/bookings';
import db from '../models';

const {Booking} = db;

const viewBookingTravelerLogin =(req,res) => {
    getBookingTravelerLogin(req.user.id, req.params.id).then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{

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

export{
    viewBookingTravelerLogin,
    createBooking, 
    getBookingsTraveler
}