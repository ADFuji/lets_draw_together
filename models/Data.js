const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    function: {
      type: String
    },
    thickness: {
        type: Number
    },
    color: {
        type: String
    },
    dots: {
        type: Array
    }
  },
  {
    timestamps: true
  }
  
);

let Data = mongoose.model("Data", dataSchema);

module.exports = Data;