/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { getAllTvs, getUserTvs } from "@/libs/sanity/api/tv";
import { InternalTv, InternalTvAndUser } from "@/models/tvs";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "../../loading";

const ProfileTvs = () => {
  const { data: session } = useSession();

  const [tvsList, setTvsList] = useState<InternalTv[]>([]);
  const [tvsUserList, setTvsUserList] = useState<InternalTvAndUser[]>([]);

  const fetchAllTvs = async () => {
    const results = await getAllTvs();
    setTvsList(results);
  };

  const fetchUserTvs = async () => {
    if (session) {
      const results = await getUserTvs(session?.user.id);
      setTvsUserList(results);
    }
  };

  useEffect(() => {
    fetchAllTvs();

    if (session) fetchUserTvs();
  }, [session]);

  if (!session) {
    return <div>Vous devez être authentifé pour accéder à cette page</div>;
  }

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WorkInProgress />
      </Suspense>
    </div>
  );
};

export default ProfileTvs;
