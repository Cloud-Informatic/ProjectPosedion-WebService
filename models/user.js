const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const Schema = mongoose.Schema;

const User_Shema = new Schema({
    index:{
        type:Number,
    },
    key_image:{
        type:String,
        default:"null"
    },
    key_videos:{
        type:String,
    },
    MetaID:{
        type:String,
    },
    createAt:{
        type: Date, 
        default: new Date(Date.now() + 3 * 60 * 60 * 1000),
    }
});

const User= mongoose.model('User',User_Shema);
module.exports = User;