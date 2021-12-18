const User = require("../models/user");


// createUser= async (req, res) => {
//     try {
//     //   const UserInfo = await User.findOne({email:req.body.email})
//     //   logger.customerRegisterLogger.log('info',` ${UserInfo._id}  => ${UserInfo.name} || ${UserInfo.email}`);
//       res.status(201).json({
//         status: "success",
//         user
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         error,
//       });
//     }
//   };

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


exports.getUSerPage = async(req,res) =>{
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
            res.redirect('/home');
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

exports.getimagePage = async(req,res) =>{
  try {
    res.status(201).render('folders',{
      status:"sucsess"
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.gettextPage = async(req,res) =>{
  try {
    res.status(201).render('folders',{
      status:"sucsess"
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.getvideoPage = async(req,res) =>{
  try {
    res.status(201).render('folders',{
      status:"sucsess"
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.getorderPage = async(req,res) =>{
  try {
    res.status(201).render('folders',{
      status:"sucsess"
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}