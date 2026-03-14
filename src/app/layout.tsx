import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "QLab — Cinematic AI Studio",
  description: "Visual storytelling · AI Production",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans bg-[#FAFAF8] text-[#1A1A18]`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}