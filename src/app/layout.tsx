import type { Metadata } from "next";
import { Noto_Serif, Spicy_Rice } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const spicyRice = Spicy_Rice({
  variable: "--font-spicy-rice",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODAYS - Telkom Orientation Days 2026",
  description:
    "Telkom Orientation Days 2026 interactive website to guide new students at Telkom University Purwokerto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${notoSerif.variable} ${spicyRice.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
