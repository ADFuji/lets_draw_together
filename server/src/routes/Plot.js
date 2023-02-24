const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../modules/dbconnect");
const Plot = require("../models/Plot");
const { json } = require("body-parser");


const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  connectdb.then(async (db) => {
    let data = await Plot.find({ })
    res.json(data);
    
  });
});

module.exports = router;