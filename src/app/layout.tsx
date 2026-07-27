import type { Metadata } from "next";
import { Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODAYS 2026",
  description:
    "Telkom Orientation Days 2026 interactive website to guide new students at Telkom University Purwokerto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${sora.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
