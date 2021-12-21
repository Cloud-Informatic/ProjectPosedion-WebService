// ------------------ Library  ------------------
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');

// ------------------ Models - Folders  ------------------
const ImageModel = require("../models/imageShema");
const VideoModel = require("../models/videoShema");
const TextModel = require("../models/textShema");
const OrderModel = require("../models/orderShema");

// ------------------ Using ------------------
var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());


// ------------------------------------ GET Operasyon ------------------------------------

// ------------------GET IMAGE ------------------
exports.getimagePage = async(req,res) =>{
  const userIn = await ImageModel.exists({MetaID:req.session.userID});
  const variable_1 = await ImageModel.find({owner:req.session.userID}).sort({index:1}); 
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
// ------------------GET VIDEO ------------------
exports.getvideoPage = async(req,res) =>{
  const userIn = await VideoModel.exists({MetaID:req.session.userID});
  const variable_1 = await VideoModel.find({owner:req.session.userID}).sort({index:1}); 
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}

// ------------------GET TEXT ------------------
exports.gettextPage = async(req,res) =>{
  const userIn = await TextModel.exists({MetaID:req.session.userID});
  const variable_1 = await TextModel.find({owner:req.session.userID}).sort({index:1}); 
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}

// ------------------GET ORDER ------------------
exports.getorderPage = async(req,res) =>{
  const userIn = await OrderModel.exists({MetaID:req.session.userID});
  const variable_1 = await OrderModel.find({owner:req.session.userID}).sort({index:1}); 
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}



// Set Operasyon
exports.setimagePage = async(req,res) =>{
  let uploadImage = req.files.image;
  let OriginImagename = uploadImage.name.split('.');
  OriginImagename = OriginImagename[OriginImagename.length-1].toUpperCase();
  // Resim formatlarını kontorl et
  const imageName = uuidv4();
  let uploadPath = './public/image/WebSiteUploads/images/' + `${imageName}`;
  console.log(`Resim Yolu => ${uploadPath}`);
  try {
    uploadImage.mv(uploadPath, async () =>{
      await ImageModel.create({
        image: 'image/WebSiteUploads/images/' + `${imageName}`,
        owner:req.session.userID,
        type:OriginImagename ,
        imageSubTitle:req.body.subTitle});
    });
    res.redirect('/video');
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.settextPage = async(req,res) =>{
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
exports.setvideoPage = async(req,res) =>{
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
exports.setorderPage = async(req,res) =>{
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