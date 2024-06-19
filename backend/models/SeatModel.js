// import connection
import db from "../config/database.js";

// get all Seats
export const getSeats = (result) => {
    db.query("SELECT * FROM seat", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const saveSelectedSeat = (id,userId,result) => {
    db.query("UPDATE seat SET seat_status = 1, user_id = ? WHERE seat_id = ?", [userId, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }else{
            result(null,results);
        }
    });
};

export const updateSeatStatus = (id,result) => {
    db.query("UPDATE seat SET seat_status = seat_status + 1  WHERE seat_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

export const resetSeatStatus = (id,result) => {
    db.query("UPDATE seat SET seat_status = 0, user_id = NULL  WHERE seat_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

// get single Seat
export const getSeatById = (id,result) => {
    db.query("SELECT * FROM seat WHERE seat_id = ?",id, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


export const getOccupiedSeats = (result) => {
    db.query("SELECT * FROM seat WHERE seat_status >= 1", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

/* export const getOccupiedSeats = (result) => {
    db.query("SELECT * FROM seat WHERE seat_status = 1", (err, results) => {
        if (err) {
            console.error('Error fetching occupied seats:', err);
            result.send(err);
        } else {
            console.log('Occupied seats:', results);
            if (results.length === 0) {
                res.status(404).json({ message: 'No occupied seats found' }); // 返回未找到数据的响应
            } else {
                result.json(results);
            }
        }
    });
}; */
