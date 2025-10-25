// Simuler une fonction qui fait quelque chose et affiche des logs
function fetchData() {
  console.log("Fetching data..."); // Afficher un message dans le terminal

  // Simuler des erreurs et afficher des logs conditionnels
  try {
    const data = getWeatherData(); // Appel à une fonction qui peut échouer
    console.log("Données météo récupérées :", data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
  }
}

// Simuler une fonction de récupération de données qui peut échouer
function getWeatherData() {
  const success = Math.random() > 0.5; // Simuler une chance de succès à 50%
  
  if (success) {
    return { temp: 22, condition: "Ensoleillé" }; // Retourner des données simulées si succès
  } else {
    throw new Error("Impossible de récupérer les données météo !"); // Simuler une erreur
  }
}

// Démarrer la récupération de données
fetchData();