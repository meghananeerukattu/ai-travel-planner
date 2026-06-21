const mongoose = require("mongoose");
const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  estimatedCost: {
    type: Number,
    default: 0,
  },
  timeOfDay: {
    type: String,
  },
});

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    durationDays: {
      type: Number,
      required: true,
    },
    budgetTier: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    interests: [String],
    itinerary: mongoose.Schema.Types.Mixed,
    hotels: mongoose.Schema.Types.Mixed,
    estimatedBudget: mongoose.Schema.Types.Mixed,
    packingList: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", TripSchema);