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
let WhichPage = 0;
exports.getimagePage = async(req,res) =>{
  WhichPage = 0
  let FileCheck = false;
  const userIn = await ImageModel.exists({MetaID:req.session.userID});
  const variable_1 = await ImageModel.find({owner:req.session.userID}).sort({index:1}); 
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
// ------------------GET VIDEO ------------------
exports.getvideoPage = async(req,res) =>{
  WhichPage = 1;
  let FileCheck = false;
  const userIn = await VideoModel.exists({MetaID:req.session.userID});
  const variable_1 = await VideoModel.find({owner:req.session.userID}).sort({index:1}); 

  if (variable_1.length == 0) {
    FileCheck = true;
  }
  console.log(FileCheck);
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}

// ------------------GET TEXT ------------------
exports.gettextPage = async(req,res) =>{
  WhichPage = 2;
  let FileCheck = false;
  const userIn = await TextModel.exists({MetaID:req.session.userID});
  const variable_1 = await TextModel.find({owner:req.session.userID}).sort({index:1}); 
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}

// ------------------GET ORDER ------------------
exports.getorderPage = async(req,res) =>{
  WhichPage = 3;
  let FileCheck = false;
  const userIn = await OrderModel.exists({MetaID:req.session.userID});
  const variable_1 = await OrderModel.find({owner:req.session.userID}).sort({index:1}); 
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render('folders',{
      status:"sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage
    });
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}



// ------------------------------------ SET Operasyon ------------------------------------
exports.setimagePage = async(req,res) =>{
  let uploadImage = req.files.image;
  let OriginImagename = uploadImage.name.split('.');
  OriginImagename = OriginImagename[OriginImagename.length-1].toLowerCase();
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
        SubTitle:req.body.subTitle});
    });
    res.redirect('/images');
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.settextPage = async(req,res) =>{
  let uploadImage = req.files.image;
  let OriginImagename = uploadImage.name.split('.');
  OriginImagename = OriginImagename[OriginImagename.length-1].toLowerCase();
  const imageName = uuidv4();
  let uploadPath = './public/image/WebSiteUploads/text/' + `${imageName}`;
  console.log(uploadImage);
  try {
    uploadImage.mv(uploadPath, async () =>{
      await TextModel.create({
        text: 'image/WebSiteUploads/text/' + `${imageName}`,
        owner:req.session.userID,
        type:OriginImagename ,
        SubTitle:req.body.subTitle});
    });
    res.redirect('/text');
  } catch (error) {
    res.status(400).json({
      status:"fail"
    });
  }
}
exports.setvideoPage = async(req,res) =>{
  let uploadImage = req.files.image;
  let OriginImagename = uploadImage.name.split('.');
  OriginImagename = OriginImagename[OriginImagename.length-1].toLowerCase();
  const imageName = uuidv4();
  let uploadPath = './public/image/WebSiteUploads/video/' + `${imageName}`;
  console.log(uploadImage);
  try {
    uploadImage.mv(uploadPath, async () =>{
      await VideoModel.create({
        video: 'image/WebSiteUploads/video/' + `${imageName}`,
        owner:req.session.userID,
        type:OriginImagename ,
        SubTitle:req.body.subTitle});
    });
    res.redirect('/video');
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