"use client";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { getAllTvShows, getUserTvShows } from "@/libs/sanity/api/tvshow";
import { InternalTvShow, InternalTvShowAndUser } from "@/models/tvShows";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfileTvShows = () => {
  const { data: session } = useSession();

  const [tvShowsList, setTvShowsList] = useState<InternalTvShow[]>([]);
  const [tvShowsUserList, setTvShowsUserList] = useState<
    InternalTvShowAndUser[]
  >([]);

  const fetchAllTvShows = async () => {
    const results = await getAllTvShows();
    setTvShowsList(results);
  };

  const fetchUserTvShows = async () => {
    if (session) {
      const results = await getUserTvShows(session?.user.id);
      setTvShowsUserList(results?.tv_shows);
    }
  };

  useEffect(() => {
    fetchAllTvShows();

    if (session) fetchUserTvShows();
  }, [session]);

  if (!session) {
    return <div>Vous devez être authentifé pour accéder à cette page</div>;
  }

  return (
    <div>
      <WorkInProgress />
    </div>
  );
};

export default ProfileTvShows;
