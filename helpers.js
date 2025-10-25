import { kmToMiles, kmhToMph, timeTo12HourFormat } from "./converters";

// Vitesse du vent en m
export const getWindSpeed = (unitSystem, windInKmh) =>
  unitSystem === "metric" ? windInKmh : kmhToMph(windInKmh);

// Visibilité en m
export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem === "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

// Temps local 
export const getTime = (unitSystem, unixTime, timezone) => {
  const date = new Date(unixTime * 1000);
  const options = { hour: "2-digit", minute: "2-digit", hour12: unitSystem === "imperial", timeZone: timezone };
  return date.toLocaleTimeString("fr-FR", options);
};

// AM/PM
export const getAMPM = (unitSystem, unixTime, timezone) => {
  if (unitSystem === "imperial") {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", hour12: true, timeZone: timezone }).includes("PM") ? "PM" : "AM";
  }
  return "";
};

// Jour de la semaine
export const getWeekDay = (unixTime, timezone) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleDateString("fr-FR", { weekday: "long", timeZone: timezone });
};