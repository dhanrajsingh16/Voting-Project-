const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  "candidate": {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  "votes": {
    type: Number,
    default: 0
  }
});


const voteSchema = new mongoose.Schema({
    "voterID": {type:String,
        required: true,
        unique: true,
        trim: true
    },
    "options": [optionSchema],
    "castedAt": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("voteSchema",voteSchema);