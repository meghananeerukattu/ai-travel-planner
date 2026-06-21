const express = require("express");
const auth = require("../middleware/auth");
const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

const router = express.Router();
router.post("/", auth, createTrip);
router.get("/", auth, getTrips);
router.get("/:id", auth, getTripById);
router.put("/:id", auth, updateTrip);
router.delete("/:id", auth, deleteTrip);

module.exports = router;