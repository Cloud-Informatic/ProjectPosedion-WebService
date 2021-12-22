const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video_Shema = new Schema({
    owner:{
        type: String,
    },
    video:{
        type:String,
    },
    SubTitle:{
        type:String
    },
    type:{
        type:String
    },
    createAt:{
        type: Date, 
        default: new Date(Date.now() + 3 * 60 * 60 * 1000),
    }
});

const Video= mongoose.model('Video',Video_Shema);
module.exports = Video;