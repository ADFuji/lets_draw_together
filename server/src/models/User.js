const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
  },
  {
    timestamps: false
  }
  
);

let User = mongoose.model("Users", userSchema);

module.exports = User;