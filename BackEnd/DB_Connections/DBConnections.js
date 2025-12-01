import mongoose from "mongoose";

mongoose.set('strictQuery',false);
 
const URL = "mongodb://0.0.0.0:27017/LMS"; 

const DB_Connection  = async()=>{ 
    await mongoose.connect(URL)
    .then(()=>{
        console.log("Connection with Database Done ")
    })
    .catch(()=>{
        console.log("DataBase Connection fails ")
    })
}

export default DB_Connection;