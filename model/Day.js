const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const daySchema = new mongoose.Schema(
  {
    date: {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
