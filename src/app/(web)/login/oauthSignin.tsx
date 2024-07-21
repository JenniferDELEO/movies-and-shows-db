"use client";

import { AiFillGithub } from "react-icons/ai";
import { oAuthSignIn } from "@/app/(web)/login/actions";
import { FcGoogle } from "react-icons/fc";

export const OAuthButtons = () => {
  return (
    <span className="inline-flex items-center">
      <AiFillGithub
        onClick={async () => await oAuthSignIn("github")}
        className="mr-3 cursor-pointer text-4xl text-black dark:text-white"
      />
      <FcGoogle
        onClick={async () => await oAuthSignIn("google")}
        className="ml-3 cursor-pointer text-4xl"
      />
    </span>
  );
};