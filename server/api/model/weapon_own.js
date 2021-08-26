const mongoose = require("mongoose");

const weaponOwnSchema = mongoose.Schema(
  {
    attribute1: {
      type: String,
      default: "Not_set",
      required: true,
    },
    attribute2: {
      type: String,
      default: "Not_set",
      required: true,
    },
    attribute1_detail: {
      type: String,
      default: "Not_set",
    },
    attribute2_detail: {
      type: String,
      default: "Not_set",
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
    sigil_set: {
      type: String,
      default: "Not_set",
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },
  },
  { collection: "weapon_own", versionKey: false }
);

module.exports = mongoose.model("WeaponOwn", weaponOwnSchema);
