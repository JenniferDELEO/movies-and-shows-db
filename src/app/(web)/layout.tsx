import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

import Toast from "@/components/Toast/Toast";
import Header from "@/components/Headers/Header";
import { Providers } from "./providers";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextAuthProvider from "@/components/AuthProvider/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Accueil - Films & Séries TV DB",
  description:
    "Accédez aux informations de millions de films et séries TV, gratuitement et sans publicité. Créez votre compte, sauvegardez vos films et séries TV préférés, créez vos propres listes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.className} size-full min-h-full text-white`}>
        <NextAuthProvider>
          <Providers>
            <Toast />
            <main className="size-full min-h-[100vh] bg-[url('https://images.unsplash.com/photo-1642095902135-f48745dd3df5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtb3ZpZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')] bg-cover bg-fixed bg-no-repeat">
              <Header />
              <div className="size-full min-h-[calc(100vh-64px)] bg-primary/90">
                <div className="mx-auto size-full pb-6 pt-10">{children}</div>
              </div>
            </main>
            <Analytics />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
