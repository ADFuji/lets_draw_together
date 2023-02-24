const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const layerSchema = new Schema(
  {
    id: {
        type: String
    },
    image: {
        type: String
    }
  },
  {
    timestamps: true
  }
  
);

let Layer = mongoose.model("Layer", layerSchema);

module.exports = Layer;