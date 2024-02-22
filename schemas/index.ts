import account from "./account";
import episode from "./episode";
import movie from "./movie";
import season from "./season";
import tv from "./tv";
import user from "./user";
import userEpisode from "./userEpisode";
import userMovie from "./userMovie";
import userSeason from "./userSeason";
import userTv from "./userTv";

export const schemaTypes = [
  user,
  account,
  movie,
  userMovie,
  tv,
  userTv,
  season,
  userSeason,
  episode,
  userEpisode,
];
