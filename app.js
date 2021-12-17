//Lib
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
var session = require('express-session');

//Mongose Locale DB Connect
mongoose.connect('mongodb://localhost/YMGK-T',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Mongo - DB Connection');
})


//using
const app = express();
// app.use(fileUpload());


//Middlewares -
app.use(express.static(__dirname+'/public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Global Variable
global.userIN = null;

app.use(session({
    secret: 'ymgk-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/YMGK-T'}),
}));

app.use('*',(req,res,next) =>{
    userIN = req.session.userID;
    next();
});


const port = process.env.PORT || 80; 
app.listen(port,()=>{
      console.log(`Localhost -> ${port}`);
    //  logger.portLogger.log('info',`Port ${port}, is avaible!`);
    }).on('error',function (err) {
        console.log("port is busy");
    })


module.exports = userIN;