const DB = {
    Host: 'localhost',
    Port: 27017,
    dbN: 'M_blogAPP'
}

const mongoose    = require("mongoose");

const connectDB = () =>{
    mongoose.connect(`mongodb://${DB.Host}:${DB.Port}/${DB.dbN}`, {
    
    }).then(() => {
        // console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
}

module.exports = connectDB;


