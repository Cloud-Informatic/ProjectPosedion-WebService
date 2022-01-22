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

// ---------------------------------------------------- GET Operasyon ----------------------------------------------------

// 4 Fonksiyon birbirine benzediği için İmage üzerinden anlatım yapılmıştır
// ------------------GET IMAGE ------------------
// Kullanıcının hangi Sayfada olduğunu belirlemek için oluşturulan değişken.
let WhichPage = 0;
exports.getimagePage = async (req, res) => {
  WhichPage = 0;
  // Yğklemiş olduğu dosya olup olmadığının kontontrolünü sağlarız
  let FileCheck = false;
  // Kullanıcının image içerisinde olup olmadığını kontrol ederiz
  const userIn = await ImageModel.exists({ MetaID: req.session.userID });
  // Kullanıcının İmage veri tabanında olup olmağını kontrol ederiz. 
  const variable_1 = await ImageModel.find({ owner: req.session.userID }).sort({
    index: 1,
  });
  // UI'ı değiştirip kullanıcıya ekleme yapması için görüntüyü değiştiririz.(Folder.ejs)
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

// ---------------------------------------------------- SET Operasyon ----------------------------------------------------

// ------------------SET IMAGE ------------------
    // Folder.ejs'den gelen Insert butonu ile tetiklenen Post işlemini karşılar.
exports.setimagePage = async (req, res) => {
  // Gönderilen dosya ve bilgileri uploadedFile değişkene alıyoruz.
  let uploadedFile = req.files.image;
  // Yükleme ismini dosya türünü belirlemek için . sonrası ve öncesi için ayırıyoruz.  
  let OriginFileName = uploadedFile.name.split(".");
  // Dosyanın türünü OriginFileName değişkenine kayıt işlemi için kayıt ediyoruz.
  OriginFileName = OriginFileName[OriginFileName.length - 1].toLowerCase();
  // unic bir isim oluşturuyoruz.
  const uuids = uuidv4();
  // Kullacının göndermiş olduğu dosya ismini unic bir isim ile değitiriyoruz
  const fileName = `${uuids}.${OriginFileName}`;
  // Kayıt işlemleri için dosya yükleme alanını tanımlıyoruz
  let uploadPath = "./public/image/WebSiteUploads/images/" + `${fileName}`;
  try {
    // .mv yüklenen dosyayı sisteme kaydetmek için tanımlanır. içesinde oluşturulan asenkron fonksiyon ile dosyayı sisteme alırken veri tabanına kayıt işlemlerini tamamlıyoruz. 
    uploadedFile.mv(uploadPath, async () => {
      await ImageModel.create({
        path: "image/WebSiteUploads/images/" + `${fileName}`,
        owner: req.session.userID,
        type: OriginFileName,
        SubTitle: req.body.subTitle,
      });
    });
    // Yükleme sonrası image yönlendirmesini yapıyoruz.
    res.redirect("/images");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

// ------------------SET TEXT ------------------
// Set image bölgesinde uygulanan yaklaşımların aynısı geri kalan set işlemleri için uygulanmaktadır.
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

// ------------------SET VIDEO ------------------
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

// ------------------SET ORDER ------------------
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
  // Dosya yolunu ve tipini kullanmak için öntanım yapıyoruz.
  var folderPath;
  var folderType;
  // Kullanıcının işlemleri hangi sayfada yaptığını belirlemek için istekte gönderdiğimiz değer içerisinde gizli değerde alınan sayfa numarasını tanımlıyoruz
  const PageIndex = req.body.pageNumber;
  // Dosyayı şifrelememiz için kullanıcının hangi dosyayı seçtiğini, seçtiği dosyanın ID numarasını veri tabanından aratıyoruz.
    switch(PageIndex) {
      case "0":
        var variable_1 = await ImageModel.find({_id:req.body.Folder_id});
        // Sonuçlar içersinde dosya yolu ve tip değişkenlerini içeriye kabul ediyoruz 
        variable_1.forEach(element => {
          folderPath = element.path;
          folderType = element.type;
        });
        break;
      case "1": 
        var variable_1 = await VideoModel.find({_id:req.body.Folder_id});
        variable_1.forEach(element => {
          folderPath = element.path;
          folderType = element.type;
        });
        break;
      case "2":
        var variable_1 = await TextModel.find({_id:req.body.Folder_id});
        variable_1.forEach(element => {
          folderPath = element.path;
          folderType = element.type;
        });
        break;
      case "3":
        var variable_1 = await OrderModel.find({_id:req.body.Folder_id});
        variable_1.forEach(element => {
          folderPath = element.path;
          folderType = element.type;
        });
        break;
      default:
        res.redirect('/user');
    }

  // Burada AES algoritmasını seçtik fakat sistem geliştirilmeye devam ederse şifreleme algoritmaları tanımlanıp kullanıcı şifreleme işlemlerinde Algoritma, Karıştırma ve Buffer oranını kendisi ayarlayabilir.
  const algorithm = 'aes-192-cbc';
  // İStekten gelen şifreyi algoritmanın private anahtarı olarak tanımlıyoruz
  const password = req.body.privateid;
  // Gönderilen anahtarın HASHini alıp
  const key = crypto.scryptSync(password, 'salt', 24);
  // Buffer değerini iv değişkenine atıyoruz
  const iv = Buffer.alloc(16, 0);
  // Dosya şifrelenmesi için Algoritma,Anahtar ve buffer değerlerini hazır tutuyoruz
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // Kullanın şifrelenecek dosyası sistemden okunuyor
  const input = fs.createReadStream(`public/${folderPath}`);

  // Kullanıcının hangi sayfadan işlem yaptığını belirleyip veritabanını yeni değerini oluşturuyoruz
  switch(PageIndex) {
    case "0":
      var newPath = `image/WebSiteUploads/images/${uuidv4()}.${folderType}`;
      var replace = await ImageModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "1":
      var newPath = `image/WebSiteUploads/video/${uuidv4()}.${folderType}`;
      var replace = await VideoModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "2":
      var newPath = `image/WebSiteUploads/text/${uuidv4()}.${folderType}`;
      var replace = await TextModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "3":
      var newPath = `image/WebSiteUploads/order/${uuidv4()}.${folderType}`;
      var replace = await OrderModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    default:
      res.redirect('/user');
  }

  // Dosya okunup veritabanı işlemleri halledildikten sonra dosyanın çıkış kayıt alanını belirliyoruz. 
  const output = fs.createWriteStream(`public/${newPath}`);
  // İstenilen dosyayı, cipher değerleri ile çıkışı ayarlayıp işlemleri tamamlıyor...
  input.pipe(cipher).pipe(output);

  fs.rm(`public/${folderPath}`, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });

  // .. kullanıcı hangi sayfadan istek aldıysa kullanıcıyı geri geldeğe yere götürüyoruz.
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

// Şifre çözme işlemleri, şifre oluşturma ile birbirine benzemektedir. Bazı alanlarda [428. Satır] Veritabanı kayıt işlemlerinin ufak alanları değişmektedir.    
exports.deCrypto = async(req,res) =>{
 try {
  var folderPath;
  var folderType;
  var PageIndex = req.body.pageNumber;
// Sayfa İndisleri =>  İmage = 0 || Video = 1 || Text = 2 || Order = 3
  switch(PageIndex) {
    case "0":
      var variable_1 = await ImageModel.find({_id:req.body.Folder_id});
      variable_1.forEach(element => {
        folderPath = element.path;
        folderType = element.type;
      });
      console.log("Dosya yolu = "+folderPath);
      break;
    case "1": 
      var variable_1 = await VideoModel.find({_id:req.body.Folder_id});
      variable_1.forEach(element => {
        folderPath = element.path;
        folderType = element.type;
      });
      break;
    case "2":
      var variable_1 = await TextModel.find({_id:req.body.Folder_id});
      variable_1.forEach(element => {
        folderPath = element.path;
        folderType = element.type;
      });
      break;
    case "3":
      var variable_1 = await OrderModel.find({_id:req.body.Folder_id});
      variable_1.forEach(element => {
        folderPath = element.path;
        folderType = element.type;
      });
      break;
    default:
      res.redirect('/user');
  }

  const algorithm = 'aes-192-cbc';
  const password = req.body.privateid;
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0); 

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(`public/${folderPath}`);

  switch(PageIndex) {
    case "0":
      var newPath = `image/WebSiteUploads/images/${uuidv4()}.${folderType}`;
      var replace = await ImageModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:false},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "1":
      var newPath = `image/WebSiteUploads/video/${uuidv4()}.${folderType}`;
      var replace = await VideoModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:false},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "2":
      var newPath = `image/WebSiteUploads/text/${uuidv4()}.${folderType}`;
      var replace = await TextModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:false},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    case "3":
      var newPath = `image/WebSiteUploads/order/${uuidv4()}.${folderType}`;
      var replace = await OrderModel.findByIdAndUpdate(req.body.Folder_id,{path:newPath, IsEncrypted:false},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
      break;
    default:
      res.redirect('/user');
  }
  const output = fs.createWriteStream(`public/${newPath}`);
  input.pipe(decipher).pipe(output);
  
  process.on('uncaughtException', function (err) {
    var PageIndexs = req.body.pageNumber;
    switch(PageIndexs) {
      case "0":
        ImageModel.findByIdAndUpdate(req.body.Folder_id,{path:folderPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
        break;
      case "1":
        VideoModel.findByIdAndUpdate(req.body.Folder_id,{path:folderPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
        break;
      case "2":
        TextModel.findByIdAndUpdate(req.body.Folder_id,{path:folderPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
        break;
      case "3":
        OrderModel.findByIdAndUpdate(req.body.Folder_id,{path:folderPath, IsEncrypted:true},{new:true}, function(err, result){if(err){console.log(err);}}).clone().catch(function(err){ console.log(err)});
        break;
      default:
        res.redirect('/user');
    }
    console.log("Node NOT Exiting...");
  });

 } catch (error) {
  res.status(400).json({
    status: "fail",
  });
 }finally{
  var PageIndex = req.body.pageNumber;
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
}

// Dosya Silme İşlemi
//asd

exports.deleteFolder = async (req, res) => {

  const PageIndex = req.body.pageNumber;
  switch(PageIndex) {
    case "0":
      var variable_1 = await ImageModel.findByIdAndDelete({
        _id: req.body.Folder_id,
      });
      res.redirect('/images');
      break;
    case "1":
      var variable_1 = await VideoModel.findByIdAndDelete({
        _id: req.body.Folder_id,
      });
      res.redirect('/video');
      break;
    case "2":
      var variable_1 = await TextModel.findByIdAndDelete({
        _id: req.body.Folder_id,
      });
      res.redirect('/text');
      break;
    case "3":
      var variable_1 = await OrderModel.findByIdAndDelete({
        _id: req.body.Folder_id,
      });
      res.redirect('/order');
      break;
    default:
      res.redirect('/user');
  }

  fs.rm(`public/${variable_1.path}`, function (err) {
    if (err) return console.log(err);
  });
};