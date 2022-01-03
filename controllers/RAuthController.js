const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getHomePage = async(req,res) =>{
    try {
        res.status(201).render('homepage',{
        status: "success",
    });   
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
         });
    }
};

exports.getHomePage = async(req,res) =>{
    try {
        res.status(201).render('homepage',{
        status: "success",
    });   
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
         });
    }
};

exports.getUserPage = async(req,res) =>{
    try {
        if (req.session.userID != null || req.session.userID != undefined ) {
            userID = req.session.userID;
            const userIn = await User.exists({MetaID:req.session.userID});
            if (userIn == false) {
              User.create({MetaID:req.session.userID});
            }
            res.status(201).render('userpage',{
            status: "success",userID});  
        }else{
            User.create({MetaID:req.session.userID});
            res.redirect('/user');
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
         });
    }
};

exports.getwallet = async(req,res) =>{
    //    console.log(req.body);
     try {
        req.session.userID = req.body.walletid;
        console.log(`UserID => ${req.session.userID}`);
        res.redirect('/user');
     } catch (error) {
        res.status(400).json({
            status:"fail"
         });
     }
}

exports.codeVerification = async(req,res) =>{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.code, salt);
    await User.findOneAndUpdate({MetaID:req.session.userID},{key_image:hash});
    try {
        res.redirect('/images');
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
         });
    }
};
