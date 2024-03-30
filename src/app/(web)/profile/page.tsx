/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import WorkInProgress from "@/components/WorkInProgress/WorkInProgress";
import { Suspense } from "react";
import LoadingSpinner from "../loading";

const Profile = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WorkInProgress />
      </Suspense>
    </div>
  );
};

export default Profile;
