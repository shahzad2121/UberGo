const axios = require("axios");

const apiKey = process.env.GOOGLE_MAPS_API;

async function getAddressCoordinate(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(
      "Google Maps Geocode Response:",
      JSON.stringify(response.data, null, 2)
    ); // Debugging

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.error("Geocode API Error:", response.data);
      throw new Error(
        response.data.error_message || "Failed to fetch coordinates"
      );
    }
  } catch (error) {
    console.error("Geocode API Request Error:", error);
    throw new Error("Unable to fetch data");
  }
}

async function getDistance(origin, destination) {
  console.log("Fetching distance for:", { origin, destination });

  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error(`API error: ${response.data.status}`);
    }

    const elements = response.data.rows[0]?.elements[0];

    if (!elements || elements.status !== "OK") {
      throw new Error(`Distance not found. Status: ${elements?.status}`);
    }

    return {
      distance: elements.distance.text, 
      duration: elements.duration.text, 
    };
  } catch (error) {
    console.error("Distance API Request Error:", error);
    throw new Error("Unable to fetch distance");
  }
}

async function getSuggestions(input) {
  console.log(input);

  if (!input) {
    throw new Error("input is required");
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;
  const response = await axios.get(url);
  try {
    if (response.data.status === "OK") {
      const suggestions = response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
      return suggestions;
    }
  } catch (error) {
    throw new Error("unable to fetch suggestions");
  }
}

module.exports = {
  getAddressCoordinate,
  getDistance,
  getSuggestions,
};
