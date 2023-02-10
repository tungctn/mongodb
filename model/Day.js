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

// Index with createdAt
daySchema.index({ updatedAt: -1 });

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
