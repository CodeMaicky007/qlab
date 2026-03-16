import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeProvider from "@/components/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Portafolio CodeMaicky007",
  description: "An expert of visual storytelling · AI Production",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${cormorant.variable} ${inter.variable} font-sans bg-[#FAFAF8] text-[#1A1A18] dark:bg-[#0D0D0D] dark:text-white`}>
          <ThemeProvider>
            <Nav />
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}