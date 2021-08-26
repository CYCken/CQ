const mongoose = require("mongoose");

const OccupationSchema = mongoose.Schema(
  {
    occupation: {
      type: String,
      required: true,
    },
    heros: [String],
  },
  { collection: "occupation", versionKey: false }
);

module.exports = mongoose.model("Occupation", OccupationSchema);
