const { model, Schema } = require("mongoose");

const Card = new Schema({
  cardnumber: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
});

module.exports = model("card", Card);
