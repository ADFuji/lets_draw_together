const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../modules/dbconnect");
const Layer = require("../models/Layer");
const { json } = require("body-parser");


const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  connectdb.then(async (db) => {
    let data = await Layer.find({ })
    res.json(data[0].image);
    
  });
});

module.exports = router;