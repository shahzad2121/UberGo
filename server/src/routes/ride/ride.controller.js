const { validationResult } = require("express-validator");
const { createRide } = require("../../services/ride.services");

async function httpCreateRide(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = req.body;
    const newRide = await createRide(ride);

    return res.status(201).json(newRide);
  } catch (error) {
    return res.status(400).json({error, status:"success"});
  }
}

module.exports = {
  httpCreateRide,
};
