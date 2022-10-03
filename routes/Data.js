const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Dots = require("../models/Data");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  console.log('/')
  connectdb.then(db => {
    let data = Dots.find({ }).then(dot => {
        res.json(dot)
    })
    
  });
});

module.exports = router;