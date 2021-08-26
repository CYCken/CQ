const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema(
  {
    ename: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    weapon_suggest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeaponSug",
      },
    ],
    weapon_own: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeaponOwn",
      },
    ],
    heroImage: { type: String, default: "" },
  },
  { collection: "character", versionKey: false }
);

module.exports = mongoose.model("Character", CharacterSchema);
