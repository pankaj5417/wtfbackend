const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,

    },
    uid:{},

    first_name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    last_name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      length: 10,
    },
    

    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {},

    status: {
      data: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
