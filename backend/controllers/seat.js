// import functions from Seat model

import {
    getSeats,
    getSeatById,
    saveSelectedSeat,
    updateSeatStatus,
    resetSeatStatus,
    getOccupiedSeats
} from "../models/SeatModel.js";

// get all Seats
export const showSeats=(req,res)=>{
    getSeats((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const saveSeat = (req, res) => {
    const seat_id = req.params.id;
    const user_id = req.body.user_id;
    saveSelectedSeat(seat_id,user_id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const updateStatus=(req,res)=>{
    updateSeatStatus(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const resetStatus=(req,res)=>{
    resetSeatStatus(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// save Seat
/*export const saveSeat=(req,res)=>{
    saveSelectedSeat(req.body.seat_id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};*/

// get Seat Status
export const getAllSeatsById=(req,res)=>{
    getSeatById(req.params.id,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

export const getAllOccupiedSeats=(req,res)=>{
    getOccupiedSeats((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

/* export const getAllOccupiedSeats=(req,res)=>{
    getOccupiedSeats((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
}; */