import { User } from "@/models/user";
import toast from "react-hot-toast";

export async function toggleUserDatas(
  category: string,
  type: string,
  id: string,
  user: User,
  moviesIds: number[],
  tvShowsIds: number[],
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
) {
  const item = {
    media_type: type === "Films" ? "movie" : "tv",
    media_id: parseInt(id),
  };

  if (user && user.accountIdV3 && user.sessionId && user.accountIdV4) {
    if (moviesIds.includes(parseInt(id))) {
      const responseToggle = await toggleFunction(
        user.accountIdV3,
        user.sessionId,
        category === "favorite"
          ? { ...item, favorite: false }
          : { ...item, watchlist: false },
      );
      if (responseToggle.success) {
        await fetchDataFunction();
        toast.success(
          `Film ${category === "favorite" ? "supprimé des favoris" : "marqué comme non vu"} avec succès`,
        );
      }
    } else if (tvShowsIds.includes(parseInt(id))) {
      const responseToggle = await toggleFunction(
        user.accountIdV3,
        user.sessionId,
        category === "favorite"
          ? { ...item, favorite: false }
          : { ...item, watchlist: false },
      );
      if (responseToggle.success) {
        await fetchDataFunction();
        toast.success(
          `Série TV ${category === "favorite" ? "supprimée des favoris" : "marquée comme non vu"} avec succès`,
        );
      }
    } else {
      const responseToggle = await toggleFunction(
        user.accountIdV3,
        user.sessionId,
        category === "favorite"
          ? { ...item, favorite: true }
          : { ...item, watchlist: true },
      );
      if (responseToggle.success) {
        await fetchDataFunction();
        toast.success(
          `${type === "Films" ? "Film" : "Série TV"} ${category === "favorite" ? `ajouté${type === "Films" ? "" : "e"} aux favoris` : `marqué${type === "Films" ? "" : "e"} comme vu`} avec succès`,
        );
      }
    }
  }
}
