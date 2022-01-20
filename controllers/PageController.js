// ------------------ Library  -----------------
const crypto = require("crypto");
const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fileUpload = require("express-fileupload");

// ------------------ Models - Folders  ------------------
const ImageModel = require("../models/imageShema");
const VideoModel = require("../models/videoShema");
const TextModel = require("../models/textShema");
const OrderModel = require("../models/orderShema");

// ------------------ Using ------------------
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ------------------------------------ GET Operasyon ------------------------------------
// ------------------GET IMAGE ------------------
// Hangi Sayfada Olduğunu Belirlemek için oluştuurlan değişken
let WhichPage = 0;
exports.getimagePage = async (req, res) => {
  WhichPage = 0;
  let FileCheck = false;
  const userIn = await ImageModel.exists({ MetaID: req.session.userID });
  const variable_1 = await ImageModel.find({ owner: req.session.userID }).sort({
    index: 1,
  });
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render("folders", {
      status: "sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
// ------------------GET VIDEO ------------------
exports.getvideoPage = async (req, res) => {
  WhichPage = 1;
  let FileCheck = false;
  const userIn = await VideoModel.exists({ MetaID: req.session.userID });
  const variable_1 = await VideoModel.find({ owner: req.session.userID }).sort({
    index: 1,
  });

  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render("folders", {
      status: "sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

// ------------------GET TEXT ------------------
exports.gettextPage = async (req, res) => {
  WhichPage = 2;
  let FileCheck = false;
  const userIn = await TextModel.exists({ MetaID: req.session.userID });
  const variable_1 = await TextModel.find({ owner: req.session.userID }).sort({
    index: 1,
  });
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render("folders", {
      status: "sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

// ------------------GET ORDER ------------------
exports.getorderPage = async (req, res) => {
  WhichPage = 3;
  let FileCheck = false;
  const userIn = await OrderModel.exists({ MetaID: req.session.userID });
  const variable_1 = await OrderModel.find({ owner: req.session.userID }).sort({
    index: 1,
  });
  if (variable_1.length == 0) {
    FileCheck = true;
  }
  try {
    res.status(201).render("folders", {
      status: "sucsess",
      variable_1,
      userIn,
      FileCheck,
      WhichPage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

// ------------------------------------ SET Operasyon ------------------------------------
exports.setimagePage = async (req, res) => {
  let uploadedFile = req.files.image;
  let OriginFileName = uploadedFile.name.split(".");
  OriginFileName = OriginFileName[OriginFileName.length - 1].toLowerCase();
  const uuids = uuidv4();
  const fileName = `${uuids}.${OriginFileName}`;
  let uploadPath = "./public/image/WebSiteUploads/images/" + `${fileName}`;
  console.log(`Resim Yolu => ${uploadPath}`);
  try {
    uploadedFile.mv(uploadPath, async () => {
      await ImageModel.create({
        path: "image/WebSiteUploads/images/" + `${fileName}`,
        owner: req.session.userID,
        type: OriginFileName,
        SubTitle: req.body.subTitle,
      });
    });
    res.redirect("/images");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.settextPage = async (req, res) => {
  let uploadedFile = req.files.image;
  let OriginFileName = uploadedFile.name.split(".");
  OriginFileName = OriginFileName[OriginFileName.length - 1].toLowerCase();
  const uuids = uuidv4();
  const fileName = `${uuids}.${OriginFileName}`;
  let uploadPath = "./public/image/WebSiteUploads/text/" + `${fileName}`;
  console.log(`Resim Yolu => ${uploadPath}`);
  try {
    uploadedFile.mv(uploadPath, async () => {
      await TextModel.create({
        path: "image/WebSiteUploads/text/" + `${fileName}`,
        owner: req.session.userID,
        type: OriginFileName,
        SubTitle: req.body.subTitle,
      });
    });
    res.redirect("/text");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.setvideoPage = async (req, res) => {
  let uploadedFile = req.files.image;
  let OriginFileName = uploadedFile.name.split(".");
  OriginFileName = OriginFileName[OriginFileName.length - 1].toLowerCase();
  const uuids = uuidv4();
  const fileName = `${uuids}.${OriginFileName}`;
  let uploadPath = "./public/image/WebSiteUploads/video/" + `${fileName}`;
  console.log(`Resim Yolu => ${uploadPath}`);
  try {
    uploadedFile.mv(uploadPath, async () => {
      await VideoModel.create({
        path: "image/WebSiteUploads/video/" + `${fileName}`,
        owner: req.session.userID,
        type: OriginFileName,
        SubTitle: req.body.subTitle,
      });
    });
    res.redirect("/video");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.setorderPage = async (req, res) => {
  let uploadedFile = req.files.image;
  let OriginFileName = uploadedFile.name.split(".");
  OriginFileName = OriginFileName[OriginFileName.length - 1].toLowerCase();
  const uuids = uuidv4();
  const fileName = `${uuids}.${OriginFileName}`;
  let uploadPath = "./public/image/WebSiteUploads/order/" + `${fileName}`;
  console.log(`Resim Yolu => ${uploadPath}`);
  try {
    uploadedFile.mv(uploadPath, async () => {
      await OrderModel.create({
        path: "image/WebSiteUploads/order/" + `${fileName}`,
        owner: req.session.userID,
        type: OriginFileName,
        SubTitle: req.body.subTitle,
      });
    });
    res.redirect("/order");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

// ------------------------------------ CRYPTO Operasyon ------------------------------------
// Sayfa İndisleri =>  İmage = 0 || Video = 1 || Text = 2 || Order = 3
exports.enCrypto = async(req,res) =>{
  var folderPath;
  var folderType;
  const variable_1 = await ImageModel.find({_id:req.body.Folder_id});
  variable_1.forEach(element => {
    folderPath = element.path;
    folderType = element.type;
  });
  console.log("Dosya yolu = "+folderPath);


  const algorithm = 'aes-192-cbc';
  const password = req.body.privateid;
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(`public/${folderPath}`);
  const newPath = `image/WebSiteUploads/images/${uuidv4()}.${folderType}`;

  const replace = await ImageModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:true},{new:true}, function(err, result){
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
  }).clone().catch(function(err){ console.log(err)});

  const output = fs.createWriteStream(`public/${newPath}`);
  input.pipe(cipher).pipe(output);

  // Şifreleme İşlemleri sonrasında kullanıcı nerede şifreleme yaptıysa onu orada tutmak için koşul ifadeleri kullanmaktayız!
  const PageIndex = req.body.pageNumber;
  switch(PageIndex) {
    case "0":
      res.redirect('/images');
      break;
    case "1":
      res.redirect('/video');
      break;
    case "2":
      res.redirect('/text');
      break;
    case "3":
      res.redirect('/order');
      break;
    default:
      res.redirect('/user');
  }
}

exports.deCrypto = async(req,res) =>{
  var folderPath;
  var folderType;
  const variable_1 = await ImageModel.find({_id:req.body.Folder_id});
  variable_1.forEach(element => {
    folderPath = element.path;
    folderType = element.type;
  });
  console.log("Dosya yolu = "+folderPath);

  const algorithm = 'aes-192-cbc';
  const password = req.body.privateid;
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0); 

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(`public/${folderPath}`);
  const newPath = `image/WebSiteUploads/images/${uuidv4()}.${folderType}`;

  const replace = await ImageModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:false},{new:true}, function(err, result){
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
  }).clone().catch(function(err){ console.log(err)});


  
  const output = fs.createWriteStream(`public/${newPath}`);

  input.pipe(decipher).pipe(output);
  const PageIndex = req.body.pageNumber;
  switch(PageIndex) {
    case "0":
      res.redirect('/images');
      break;
    case "1":
      res.redirect('/video');
      break;
    case "2":
      res.redirect('/text');
      break;
    case "3":
      res.redirect('/order');
      break;
    default:
      res.redirect('/user');
  }
}