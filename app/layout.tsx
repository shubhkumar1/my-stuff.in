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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const ogImageUrl = siteUrl ? `${siteUrl}/OG.png` : "/OG.png";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : null,
  title: {
    default: "Mind-Stuff Blog",
    template: "%s | Mind-Stuff Blog",
  },
  description: "A digital notebook for my journey. Simple ideas on focus, calm, and getting things done — without the overwhelm.",
  openGraph: {
    title: "Mind-Stuff Blog",
    description: "A digital notebook for my journey. Simple ideas on focus, calm, and getting things done — without the overwhelm.",
    url: siteUrl,
    siteName: "Mind-Stuff Blog",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Mind-Stuff Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mind-Stuff Blog",
    description: "A digital notebook for my journey. Simple ideas on focus, calm, and getting things done — without the overwhelm.",
    images: [ogImageUrl],
  },
  other: {
    "theme-color": "#0F6E56",
  },
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
