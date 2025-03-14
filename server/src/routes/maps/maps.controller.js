const { validationResult } = require("express-validator");
const {
  getAddressCoordinate,
  getDistance,
  getSuggestions,
} = require("../../services/maps.services");

async function httpGetAddressCoordinates(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    if (address) {
      const coordinates = await getAddressCoordinate(address);
      res.status(201).json(coordinates);
    } else {
      console.log("address is not given");
    }
  } catch (error) {
    res.status(404).json({ message: "internal server error" });
  }
}
async function httpGetDistance(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination } = req.query;
    // console.log(origin, destination);

    const distance = await getDistance(origin, destination);
    res.status(200).json(distance);
  } catch (error) {
    throw new Error("internal server error", error);
  }
}

async function httpGetSuggestions(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { input } = req.query;

    if (!input) {
      res.status(400).json({ message: "input require" });
    }
    const suggestions = await getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(401).json(error);
  }
}

module.exports = {
  httpGetAddressCoordinates,
  httpGetDistance,
  httpGetSuggestions,
};
