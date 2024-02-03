import { User } from "@/models/user";
import toast from "react-hot-toast";

export async function toggleUserDatas(
  category: string,
  type: string,
  id: string,
  user: User,
  toggleFunction: (
    accountIdV3: number,
    sessionId: string,
    item: any,
  ) => Promise<{
    success: boolean;
    status_code: number;
    status_message: string;
  }>,
  fetchDataFunction: () => Promise<void>,
  moviesIds?: number[],
  tvShowsIds?: number[],
  isFavorite?: boolean,
  isInWatchlist?: boolean,
) {
  const item = {
    media_type: type === "movie" ? "movie" : "tv",
    media_id: parseInt(id),
  };

  if (
    user &&
    user.tmdb_accountIdV3 &&
    user.tmdb_sessionId &&
    user.tmdb_accountIdV4
  ) {
    if (typeof isFavorite !== "undefined") {
      const responseToggle = await toggleFunction(
        user.tmdb_accountIdV3,
        user.tmdb_sessionId,
        { ...item, favorite: !isFavorite },
      );
      if (responseToggle.success) {
        await fetchDataFunction();
        toast.success(
          `${type === "movie" ? "Film" : "Série TV"} ${isFavorite ? `supprimé${type === "movie" ? "" : "e"} des favoris` : `ajouté${type === "movie" ? "" : "e"} aux favoris`} avec succès`,
        );
      }
    }
    if (typeof isInWatchlist !== "undefined") {
      const responseToggle = await toggleFunction(
        user.tmdb_accountIdV3,
        user.tmdb_sessionId,
        { ...item, watchlist: !isInWatchlist },
      );
      if (responseToggle.success) {
        await fetchDataFunction();
        toast.success(
          `${type === "movie" ? "Film" : "Série TV"} ${isInWatchlist ? `supprimé${type === "movie" ? "" : "e"} de la liste de suivi` : `ajouté${type === "movie" ? "" : "e"} à la liste de suivi`} avec succès`,
        );
      }
    }
    if (moviesIds && tvShowsIds) {
      if (moviesIds.includes(parseInt(id))) {
        const responseToggle = await toggleFunction(
          user.tmdb_accountIdV3,
          user.tmdb_sessionId,
          category === "favorite"
            ? { ...item, favorite: false }
            : { ...item, watchlist: false },
        );
        if (responseToggle.success) {
          await fetchDataFunction();
          toast.success(
            `Film ${category === "favorite" ? "supprimé des favoris" : "supprimé de la liste de suivi"} avec succès`,
          );
        }
      } else if (tvShowsIds.includes(parseInt(id))) {
        const responseToggle = await toggleFunction(
          user.tmdb_accountIdV3,
          user.tmdb_sessionId,
          category === "favorite"
            ? { ...item, favorite: false }
            : { ...item, watchlist: false },
        );
        if (responseToggle.success) {
          await fetchDataFunction();
          toast.success(
            `Série TV ${category === "favorite" ? "supprimée des favoris" : "supprimée de la liste de suivi"} avec succès`,
          );
        }
      } else {
        const responseToggle = await toggleFunction(
          user.tmdb_accountIdV3,
          user.tmdb_sessionId,
          category === "favorite"
            ? { ...item, favorite: true }
            : { ...item, watchlist: true },
        );
        if (responseToggle.success) {
          await fetchDataFunction();
          toast.success(
            `${type === "movie" ? "Film" : "Série TV"} ${category === "favorite" ? `ajouté${type === "movie" ? "" : "e"} aux favoris` : `marqué${type === "movie" ? "" : "e"} comme vu`} avec succès`,
          );
        }
      }
    }
  }
}
