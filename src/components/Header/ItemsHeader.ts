export const getItems = (baseUrl: string, type: string) => {
  const firstTab = [
    {
      link: `${baseUrl}`,
      name: "Page Principale",
      key: "principal",
    },
    {
      link: `${baseUrl}/cast`,
      name: "Distribution des rôles et équipe technique",
      key: "castAndCrew",
    },
    {
      link: `${baseUrl}/release-dates`,
      name: "Dates de sortie",
      key: "releaseDates",
    },
    {
      link: `${baseUrl}/similars`,
      name: "Similaires",
      key: "similars",
    },
    {
      link: `${baseUrl}/recommendations`,
      name: "Recommandations",
      key: "recommendations",
    },
  ];
  if (type === "tvshow") {
    firstTab.push({
      link: `${baseUrl}/seasons`,
      name: "Saisons",
      key: "seasons",
    });
  }
  const secondTab = [
    {
      link: `${baseUrl}/images/backdrops`,
      name: "Fonds d'écran",
      key: "backdrops",
    },
    {
      link: `${baseUrl}/images/logos`,
      name: "Logos",
      key: "logos",
    },
    {
      link: `${baseUrl}/images/posters`,
      name: "Affiches",
      key: "posters",
    },
    {
      link: `${baseUrl}/videos`,
      name: "Vidéos",
      key: "videos",
    },
  ];
  return { firstTab, secondTab };
};
