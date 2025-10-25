import { degToCompass } from "../services/converters";
import { ctoF } from "../services/converters"; //conversion celsius farenheit
import styles from "./MainCard.module.css";

export const MainCard = ({ location, data, unitSystem }) => {
  const temp = data.temp;
  const windSpeed = data.windspeed;
  const windDir = data.winddirection;

  const getDescription = (code) => {
    const map = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      61: "Rain",
      63: "Heavy rain",
      71: "Snow",
      //... selon la doc Open-Meteo
    };
    return map[code] || "Unknown";
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {location.city}, {location.country}
      </h1>
      <p className={styles.description}>{getDescription(data.weathercode)}</p>
      <h1 className={styles.temperature}>
        {unitSystem === "metric" ? Math.round(temp) : Math.round(ctoF(temp))}°
        {unitSystem === "metric" ? "C" : "F"}
      </h1>
      <p>
        Wind:{" "}
        {unitSystem === "metric" ? windSpeed : Math.round(windSpeed * 2.2369)}{" "}
        {unitSystem === "metric" ? "km/h" : "mph"} {degToCompass(windDir)}
      </p>
    </div>
  );
};