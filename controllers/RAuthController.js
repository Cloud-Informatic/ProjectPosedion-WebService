// Veri tabanı için User modelini çağırıyoruz.  
const User = require("../models/user");

// PageRouthe içerisinden yönlendirme ile tetiklenen ana sayfayı getiren fonksiyon
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

// PageRouthe içerisinden yönlendirme ile tetiklenen kullanıcı sayfasını getiren fonksiyon
exports.getUserPage = async(req,res) =>{
    try {
        // Oturum ID değerinin boş veya tanımsız olup olmadığını kontol ediyoruz
        if (req.session.userID != null || req.session.userID != undefined ) {
            // app.js içerisinde olan global değişkeni oturum açılan ıd ile eşitliyoruz 
            userID = req.session.userID;
            // userIn değişkeni veritabanında kayıt işlemlerini kontor eder.   
            const userIn = await User.exists({MetaID:req.session.userID});
            // Eğer sistemde kayıt yoksa kayıt işlemi yapar
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

// Kullanıcının Wallet değerini öğreniriz
exports.getwallet = async(req,res) =>{
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
