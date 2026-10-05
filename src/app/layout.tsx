import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasa Bikin Website — Cepat, Murah, Profesional",
  description: "Jasa pembuatan website: landing page, company profile, toko online, dan web app custom.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
