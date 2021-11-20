const express = require("express");
const app = express();
//const pet = require("./routes/pet")
const db = require("./config/database");
const multer = require("multer");
var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
//app.use(express.static(path.join(__dirname, "public")));

app.get("/getPets", (req, res) => {
  var sql = "SELECT * FROM pets";
  db.query(sql, function (err, data) {
    if (err) throw err;
    if (data.length > 1) {
      res.status(200).json({ message: data, status: true });
    } else {
      res.status(400).json({ message: "No Data Found", status: false });
    }
  });
});
app.get("/getBreed/:id", (req, res) => {
  var id = req.params.id;
  console.log(id);
  var sql = "SELECT * FROM pet_breeds WHERE Pet_Id = ? ";
  db.query(sql, [id], function (err, data) {
    if (err) throw err;
    if (data.length > 1) {
      res.status(200).json({ message: data, status: true });
    } else {
      res.status(400).json({ message: "No Data Found", status: false });
    }
  });
});
app.get("/pet/:id", (req, res) => {
  const D_id = req.params.id;
  var sql = "SELECT * FROM pet_breeds WHERE Breed_id = ?";
  db.query(sql, [D_id], function (err, data) {
    console.log(D_id);
    if (err) throw err;
    if (data.length > 0) {
      res.status(200).json({ message: data, status: true });
    } else {
      res.status(400).json({ message: "No Data Found", status: false });
    }
  });
});

app.get("/pet/image/:path", (req, res) => {
  res.download("./public/images/pet_images/" + req.params.path);

});

module.exports = app;
