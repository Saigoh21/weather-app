import { useState, useEffect } from "react";
import { DEFAULT_LOCATION } from "../ville/config";
import { MainCard } from "../components/MainCard";
import { MetricsBox } from "../components/MetricsBox";
import { DateAndTime } from "../components/DateAndTime";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null); //

  //Fonction de récupération météo 
  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_LOCATION),
      });

      console.log("Réponse API brute", res);

      if (!res.ok) {
        const errData = await res.json();
        console.log("Erreur API:", errData);
        setError(errData.error || "Erreur serveur");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Données récupérées", data);

      if (data && data.location && data.data) {
        setWeatherData(data);
        setLastUpdated(new Date()); //Enregistre la date/heure de la dernière mise à jour
      } else {
        setError("Données météo mal formatées.");
      }
    } catch (err) {
      console.log("Impossible de récupérer les données météo", err);
      setError("Impossible de récupérer les données météo");
    } finally {
      setLoading(false);
    }
  };

  //useEffect pour chargement initial + rafraîchissement automatique
  useEffect(() => {
    fetchWeather();

    //Rafraîchir automatiquement toutes les 1 heure (3600000 ms)
    const interval = setInterval(() => {
      console.log("🔄 Rafraîchissement automatique des données météo...");
      fetchWeather();
    }, 3600000);

    //Nettoyage de l’intervalle à la désactivation du composant
    return () => clearInterval(interval);
  }, []);

  const toggleUnitSystem = () => {
    setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");
  };

  //Rendu du composant
  if (loading) return <LoadingScreen loadingMessage="Chargement des données..." />;
  if (error) return <ErrorScreen errorMessage={error} />;

  return weatherData ? (
    <div>
      <UnitSwitch onClick={toggleUnitSystem} unitSystem={unitSystem} />
      <MainCard
        location={weatherData.location}
        data={weatherData.data}
        unitSystem={unitSystem}
      />
      <MetricsBox data={weatherData} unitSystem={unitSystem} />
      <DateAndTime data={weatherData} unitSystem={unitSystem} />

      {/*Affichage facultatif de la dernière mise à jour */}
      {lastUpdated && (
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#777" }}>
          Dernière mise à jour : {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  ) : null;
}
