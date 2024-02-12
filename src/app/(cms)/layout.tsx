import { ReactNode } from "react";

export const metadata = {
  title: "Studio - Films & Séries TV DB",
  description: "Gestion administrative du site Films & Séries TV DB.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
