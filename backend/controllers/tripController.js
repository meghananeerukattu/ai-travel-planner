const Trip = require("../models/Trip");
const generateTravelPlan = require("../utils/gemini");

exports.createTrip = async (req, res) => {
  try {
    const {
      destination,
      durationDays,
      budgetTier,
      interests,
    } = req.body;

    const aiData = await generateTravelPlan(
  destination,
  durationDays,
  budgetTier,
  interests
);

console.log(
  "AI DATA:",
  JSON.stringify(aiData, null, 2)
);
const planData = aiData.travel_plan || aiData.plan || aiData;
const trip = await Trip.create({
  userId: req.user.id,
  destination,
  durationDays,
  budgetTier,
  interests,
  itinerary:
    planData.day_by_day_itinerary ||
    planData.itinerary ||
    [],
  hotels:
    planData.hotel_recommendations ||
    planData.hotels ||
    [],
  estimatedBudget:
    planData.budget_estimate ||
    planData.estimatedBudget ||
    planData.budget_estimate_per_person_usd ||
    planData.budget_estimate_sgd_per_person ||
    {},
  packingList:
    planData.packing_list ||
    planData.packingList ||
    [],
});
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user.id,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }
    res.json({
      message: "Trip deleted successfully",
    });
  } 
  catch (error) {
  console.error("TRIP ERROR:", error);
  res.status(500).json({
    message: error.message,
  });
}
};