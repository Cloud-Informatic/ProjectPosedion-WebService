const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image_Shema = new Schema({
    owner:{
        type: String,
    },
    path:{
        type: String,
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

const Image= mongoose.model('Image',Image_Shema);
module.exports = Image;