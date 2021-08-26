const mongoose = require("mongoose");

const SigilSetSchema = mongoose.Schema(
  {
    attribute: {
      type: String,
      required: true,
    },
    sigil1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sigil",
      required: true,
    },
    sigil2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sigil",
      required: true,
    },
  },
  { collection: "sigil_set", versionKey: false }
);

module.exports = mongoose.model("SigilSet", SigilSetSchema);
