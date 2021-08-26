const mongoose = require("mongoose");

const SigilSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ename: { type: String, required: true },
    attribute: { type: String, required: true, default: "" },
    sigilImage: { type: String, default: "" },
    star: { type: Number, required: true, default: 4 },
  },
  { collection: "sigils", versionKey: false }
);

module.exports = mongoose.model("Sigil", SigilSchema);
