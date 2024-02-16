"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (session && session.user) {
      if (!user.tmdb_username) {
        router.push("/redirection-to-tmdb");
      } else {
        router.push("/profile");
      }
    }
  }, [router, session, user.tmdb_username]);

  const loginHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
      toast.error("Something wen't wrong");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Inscription réussie. Veuillez vous identifier");
        await signIn();
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setFormData(defaultFormData);
    }
  };
  return (
    <section className="container mx-auto">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6 xl:w-[50%]">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Créer un compte
          </h1>
          <p>OU</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 cursor-pointer text-4xl text-black dark:text-white"
            />
            <FcGoogle
              onClick={loginHandler}
              className="ml-3 cursor-pointer text-4xl"
            />
          </span>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Nom d'utilisateur"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mx-auto block rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-primary focus:outline-none"
          >
            Créer un compte
          </button>
          <div>
            <p className="text-center">
              Vous avez déjà un compte ?{" "}
              <button onClick={loginHandler} className="underline">
                Connexion
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;
