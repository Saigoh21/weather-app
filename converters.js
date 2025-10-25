// Conversion température
export const ctoF = (c) => (c * 9) / 5 + 32;

// Conversion vitesse du vent km/h → mph
export const kmhToMph = (kmh) => (kmh * 0.621371).toFixed(1);

// Conversion distance km → miles
export const kmToMiles = (km) => (km / 1.609).toFixed(1);

// Conversion heure 24h → 12h
export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);
  return `${hours % 12 || 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};