const captainModel = require("./captain.mongo");

async function createNewCaptain(captain) {
  try {
    const { firstname, email, password, color, capacity, plate, vehicleType } =
      captain;

    const hashedPassword = await captainModel.hashPassword(password);
    const newCaptain = captainModel.create({
      firstname,
      email,
      color,
      capacity,
      plate,
      vehicleType,
      password: hashedPassword,
    });
    return newCaptain;
  } catch (error) {
    console.error({ message: "captain is not registered", error });
    throw error;
  }
}

module.exports = { createNewCaptain };
