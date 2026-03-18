import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import "../prose-styles.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mind-stuff.in",
  description: "A digital notebook for my journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${merriweather.variable} ${inter.variable} font-sans antialiased transition-colors duration-300 relative`}
      >
        <CustomCursor />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
