import { degToCompass, mpsToMph, kmToMiles } from "../services/converters";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ data, unitSystem }) => {
  const current = data.data;
  const humidity = data.hourly.relative_humidity_2m[0]; // Récupération de l'humidité
  const visibility = data.hourly.visibility[0] / 1000; // Converti en km

  return (
    <div className={styles.wrapper}>
      <MetricsCard title="Humidity" iconSrc="/icons/humidity.png" metric={humidity} unit="%" />
      <MetricsCard
        title="Wind speed"
        iconSrc="/icons/wind.png"
        metric={unitSystem === "metric" ? current.windspeed : mpsToMph(current.windspeed)}
        unit={unitSystem === "metric" ? "m/s" : "mph"}
      />
      <MetricsCard
        title="Wind direction"
        iconSrc="/icons/compass.png"
        metric={degToCompass(current.winddirection)}
      />
      <MetricsCard
        title="Visibility"
        iconSrc="/icons/binocular.png"
        metric={unitSystem === "metric" ? visibility.toFixed(1) : kmToMiles(visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
    </div>
  );
};

