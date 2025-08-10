const express = require("express");
const resController = require("../controllers/reservationsController");
const router = express.Router();

const middle = express.urlencoded({
  extended: false,
  limit: 10000,
  parameterLimit: 5,
});

router.post("/make", middle, resController.makeReservation);
router.get("/get", resController.getReservations);

// TODO:
// router.get("/get-item");
// router.delete("/remove-items");

module.exports = router;
