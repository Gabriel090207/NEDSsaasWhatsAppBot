import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatsApp SaaS",
  description: "Painel de automação WhatsApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}