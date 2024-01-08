import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import { Providers } from "./providers";

import { Poppins } from "next/font/google";

import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProvider from "@/components/UserProvider/UserProvider";

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
      <body
        className={`${poppins.className} bg-[url('https://images.unsplash.com/photo-1509564324749-471bd272e1ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWVzJTIwc2hvd3MlMjBwb3N0ZXJzfGVufDB8MHwwfHx8MA%3D%3D')] bg-no-repeat bg-cover text-white`}
      >
        <Providers>
          <UserProvider>
            <Header />
            <div className="bg-primary opacity-90 md:w-4/5 mx-auto -mb-28">
              {children}
            </div>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
