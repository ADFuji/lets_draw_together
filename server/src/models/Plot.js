const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plotSchema = new Schema(
  {
    drawer: {
      type: String,
      default: "Drawer"
    },
    coordinates: {
        type: Array
    },
    brush_id: {
        type: String,
        default : "1"
    },
    color: {
        type: String,
        default: "black"
    },
    size: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
  },
  {
    timestamps: false
  }
  
);

let Plot = mongoose.model("Plots", plotSchema);

module.exports = Plot;