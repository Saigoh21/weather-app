import styles from "./DateAndTime.module.css";


export const DateAndTime = ({ data, unitSystem }) => {
  const dt = data.data.dt; // timestamp ISO
  const timezone = data.location.timezone;

  // Convertir en date locale de la ville
  const dateObj = new Date(
    new Date(dt).toLocaleString("en-US", { timeZone: timezone })
  );

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const formattedTime =
    unitSystem === "metric"
      ? `${hours}:${minutes}`
      : `${hours % 12 || 12}:${minutes}`;
  const ampm = unitSystem === "imperial" ? (hours >= 12 ? "PM" : "AM") : "";

  return (
    <div className={styles.wrapper}>
      <h2>{`${dateObj.toLocaleDateString()} ${formattedTime} ${ampm}`}</h2>
    </div>
  );
};