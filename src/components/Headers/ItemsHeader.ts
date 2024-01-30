export const getItems = (
  baseUrl: string,
  type: string,
  numberOfBackdrops: number,
  numberOfLogos: number,
  numberOfPosters: number,
  numberOfVideos: number,
) => {
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
      link: `${baseUrl}/similars/1`,
      name: "Similaires",
      key: "similars",
    },
    {
      link: `${baseUrl}/recommendations/1`,
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
      number: numberOfBackdrops,
    },
    {
      link: `${baseUrl}/images/logos`,
      name: "Logos",
      key: "logos",
      number: numberOfLogos,
    },
    {
      link: `${baseUrl}/images/posters`,
      name: "Affiches",
      key: "posters",
      number: numberOfPosters,
    },
    {
      link: `${baseUrl}/videos`,
      name: "Vidéos",
      key: "videos",
      number: numberOfVideos,
    },
  ];
  return { firstTab, secondTab };
};
