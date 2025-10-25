import { DEFAULT_LOCATION } from "../../ville/config.js";

export default async function handler(req, res) {
  try {
    // Fusionne la config par défaut avec les éventuels paramètres envoyés
    const { latitude, longitude, city, country } = {
      ...DEFAULT_LOCATION,
      ...(req.body || {}),
    };

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude ou longitude manquante." });
    }

    console.log("Paramètres utilisés :", { latitude, longitude, city, country });

    // Requête à Open-Meteo
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,visibility&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`
    );

    if (!weatherResponse.ok) {
      console.error(`Erreur HTTP: ${weatherResponse.status} - ${weatherResponse.statusText}`);
      return res.status(weatherResponse.status).json({ error: `Erreur API Open-Meteo: ${weatherResponse.statusText}` });
    }

    const weatherData = await weatherResponse.json();
    console.log("Réponse brute Open-Meteo :", JSON.stringify(weatherData, null, 2));

    if (!weatherData || !weatherData.current_weather) {
      console.error("Données météo manquantes ou mal formatées.");
      return res.status(500).json({ error: "Impossible de récupérer la météo." });
    }

    // Formatage pour le frontend
    const openMeteoData = {
      location: {
        city,
        country,
        latitude,
        longitude,
        timezone: weatherData.timezone,
      },
      data: {
        temp: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        winddirection: weatherData.current_weather.winddirection,
        weathercode: weatherData.current_weather.weathercode,
        dt: weatherData.current_weather.time,
      },
      hourly: weatherData.hourly,
    };

    console.log("Données météo reformattées :", JSON.stringify(openMeteoData, null, 2));

    return res.status(200).json(openMeteoData);

  } catch (error) {
    console.error("Erreur API:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

