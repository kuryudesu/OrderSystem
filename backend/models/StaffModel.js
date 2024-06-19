// import connection
import db from "../config/database.js";

// get all employees
export const getAllStaff = (result) => {
    db.query("SELECT * FROM staff", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// get single user
export const getstaffBySn = (data,result) => {
    db.query("SELECT staff_id, staff_name, staff_password FROM staff WHERE staff_sn = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// insert User
export const insertStaff = (data,result) => {
    db.query("INSERT INTO staff SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};




