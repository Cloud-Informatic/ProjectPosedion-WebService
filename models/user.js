const mongoose = require("mongoose");
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});


const Schema = mongoose.Schema;

const User_Shema = new Schema({
    index:{
        type:Number,
    },
    MetaID:{
        type:String,
    },
    createAt:{
        type: Date, 
        default: new Date(Date.now() + 3 * 60 * 60 * 1000),
    }
});

console.log(this.MetaID);
const User= mongoose.model('User',User_Shema);
module.exports = User;