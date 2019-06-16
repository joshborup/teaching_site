const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  sections: [
    {
      section: { type: String, required: true },
      timestamp: { type: Number, required: true }
    }
  ],
  repo_link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("content", contentSchema);
