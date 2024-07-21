import { redirect } from "next/navigation";
import { emailLogin, signup } from "@/app/(web)/login/actions";
import { createClient } from "../../../../utils/supabase/server";
import { OAuthButtons } from "@/app/(web)/login/oauthSignin";

export default async function Login(
  {
    searchParams
  }: {
    searchParams: { message: string };
  }) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  console.log("user", user);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  return (
    <section className="container mx-auto">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6 xl:w-[50%]">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Se connecter
          </h1>
          <p>OU</p>
          <OAuthButtons />
        </div>
        <form className="space-y-4 md:space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputStyles}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            minLength={6}
            className={inputStyles}
          />
          {searchParams.message && (
            <div className="text-sm font-medium text-red-600">
              {searchParams.message}
            </div>
          )}
          <button
            formAction={emailLogin}
            className="mx-auto block rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-primary focus:outline-none"
          >
            Connexion
          </button>
          <div>
            <p className="text-center">
              Vous n'avez pas de compte ?{" "}
              <button className="underline" formAction={signup}>
                Créer un compte
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}