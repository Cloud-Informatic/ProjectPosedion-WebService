const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order_Shema = new Schema({
    owner:{
        type: String,
    },
    order:{
        type:String,
    },
    orderSubTitle:{
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

const Order= mongoose.model('Order',Order_Shema);
module.exports = Order;