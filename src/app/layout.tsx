import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import { Providers } from "./providers";

import { Poppins } from "next/font/google";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProvider from "@/components/UserProvider/UserProvider";
import Toast from "@/components/Toast/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Films - Séries TV Database",
  description:
    "View all movies and TV shows and create your own lists to manage the ones you own or want to see.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.className} text-white`}>
        <Providers>
          <UserProvider>
            <Toast />
            <main className="bg-[url('https://images.unsplash.com/photo-1642095902135-f48745dd3df5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxtb3ZpZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')] bg-cover bg-fixed bg-no-repeat">
              <Header />
              <div className="mx-auto -mb-20 size-full bg-primary pt-10 opacity-90">
                {children}
              </div>
            </main>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
