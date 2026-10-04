import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const DESCRIPTION =
  "Développeur full-stack et étudiant à Epitech Lyon, passionné par le bas niveau, le web et l'intelligence artificielle.";

export const metadata: Metadata = {
  title: {
    default: "Jan Nguyen — Développeur full-stack",
    template: "%s · Jan Nguyen",
  },
  description: DESCRIPTION,
  authors: [{ name: "Jan Nguyen" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Jan Nguyen",
    title: "Jan Nguyen — Développeur full-stack",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} antialiased`}>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
