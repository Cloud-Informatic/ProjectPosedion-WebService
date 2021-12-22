//Lib
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
var session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');

const logger = require("./controllers/logger");
const pageRouther = require('./routes/PageRouthe');
const postRouther = require('./routes/postRouther');



//Mongose Locale DB Connect
mongoose.connect('mongodb://localhost/YMGK-T',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Mongo - DB Connection');
})


//using
const app = express();
app.use(fileUpload());
 

//Middlewares -
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public','js')));
app.use(express.static(path.join(__dirname,'public','css')));
app.use(express.static(path.join(__dirname,'public','image')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.set('view engine','ejs');

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

app.use('/',pageRouther);
app.use('/post',postRouther)




const port = process.env.PORT || 80; 
app.listen(port,()=>{
    console.log("Port Dinleniyor");
     logger.portLogger_Active.log('info',`Port ${port}, is active!`);
    }).on('error',function (err) {
     logger.portLogger_NonActive.log('error',`Port ${port}, not run! => ${err}`);
    })

module.exports = userIN;