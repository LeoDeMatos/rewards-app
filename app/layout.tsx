import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rewards App",
  description: "Points reward system",
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
