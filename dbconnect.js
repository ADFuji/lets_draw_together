const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb://localhost:27017/lets_draw_together";

const connect = mongoose.connect(url);

module.exports = connect;