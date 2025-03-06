const rideModel = require("../models/ride/ride.mongo");
const { getDistance } = require("./maps.services");

async function getFare(origin, destination) {
  if (!origin || !destination) {
    throw new Error("origin and destination required");
  }

  const distance = await getDistance(origin, destination);

  const baseFare = {
    car: 200,
    auto: 150,
    bike: 100,
  };

  const farePerMinute = {
    car: 20,
    auto: 15,
    bike: 10,
  };

  const farePerKm = {
    car: 100,
    auto: 70,
    bike: 50,
  };

  const vehicleType = ["car", "auto", "bike"];

  const fare = {};

  for (const type of vehicleType) {
    fare[type] = Math.round(
      baseFare[type] +
        (distance.distance.value / 1000) * farePerKm[type] +
        (distance.duration.value / 60) * farePerMinute[type]
    );
  }

  return fare;
}

async function createRide(ride) {
  const { user: userId, origin, destination, vehicleType } = ride;
  if (!userId || !origin || !destination || !vehicleType || !fare) {
    throw new Error("ride data is missing");
  }

  const fare = await getFare(origin, destination);

  console.log(fare);

  const newRide = await rideModel.create({
    userId,
    origin,
    destination,
    fare: fare[vehicleType],
  });

  return newRide;
}

module.exports = {
  getFare,
  createRide,
};
