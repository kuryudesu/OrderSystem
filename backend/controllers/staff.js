// import functions from Staff model

import {
    getAllStaff,
    getstaffBySn,
    insertStaff
} from "../models/StaffModel.js";

// get all Staff
export const allStaff=(req,res)=>{
    getAllStaff((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single staff
export const showAStaff = (req,res)=>{
    getstaffBySn(req.params.sn,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create staff
export const createStaffAccount=(req,res)=>{
    const data = req.body;
    insertStaff(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};




