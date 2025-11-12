import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poupe & Ganhe",
  description: "Sistema de pontos - Poupe & Ganhe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-white">{children}</body>
    </html>
  );
}
