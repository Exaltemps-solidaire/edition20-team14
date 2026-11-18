import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imagine for Margo",
  description: "Trouvez votre façon d'agir avec Imagine for Margo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
