const mongoose = require("mongoose");
const contentSchema = require("./courseContent");
const coursesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "content",
    required: true
  }
});

module.exports = mongoose.model("course", coursesSchema);
