"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../../utils/supabase/server";
import { Provider } from "@supabase/auth-js";
import { getUrl } from "../../../../utils/helpers/getUrl";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Une erreur s'est produite lors de la connexion");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = createClient();
  const redirectUrl = getUrl("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    }
  })

  if (error) {
    redirect("/login?message=Impossible d'authentifier l'utilisateur")
  }

  return redirect(data.url)
}

export async function githubLogin() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "/auth/callback"
    }
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log('error', error);
    redirect("/login?message=Une erreur s'est produite lors de l'authentification");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
