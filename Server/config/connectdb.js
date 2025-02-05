const mongoose = require('mongoose');

const connectdb = async() =>{
    try{
        mongoose.connect('mongodb://localhost:27017/practiceDb');
        console.log('MongoDb connected....')
    }
    catch(err){
        console.log("Error: " + err)
    }
}
module.exports = connectdb