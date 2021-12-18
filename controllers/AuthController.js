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
            console.log(`UserID => ${req.session.userID}`);
            res.status(201).render('userpage',{
            status: "success",});  
        }else{
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