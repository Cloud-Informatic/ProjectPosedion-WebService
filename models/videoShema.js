const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video_Shema = new Schema({
    owner:{
        type: String,
    },
    path:{
        type: String,
    },
    folderPath:{
        type:String,
    },
    SubTitle:{
        type:String
    },
    IsEncrypted:{
        type:Boolean,
        default:false
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