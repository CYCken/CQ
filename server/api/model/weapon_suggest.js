const mongoose = require("mongoose");

const weaponSuggestSchema = mongoose.Schema(
  {
    note: {
      type: String,
    },
    attribute1: {
      type: String,
      required: true,
    },
    attribute2: {
      type: String,
      required: true,
    },
    attribute1_detail: {
      type: String,
      required: true,
    },
    attribute2_detail: {
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
    sigil_set: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },
  },
  { collection: "weapon_suggest", versionKey: false }
);

module.exports = mongoose.model("WeaponSug", weaponSuggestSchema);
