import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import WaveTransition from "@/components/WaveTransition";

export const metadata: Metadata = {
  title: "Duckfolio | Portofolio Novebrian Setya Purwanto",
  
  description: "Duckfolio adalah website portofolio resmi Novebrian Setya Purwanto (Brian), seorang web developer yang berfokus pada ekosistem modern web development.",
  
  keywords: ["Novebrian", "Brian", "Duckfolio", "Novebrian Setya Purwanto", "Web Developer Indonesia"],
  
  authors: [{ name: "Novebrian Setya Purwanto" }],
  
  openGraph: {
    title: "Duckfolio - Novebrian Setya Purwanto",
    description: "Navigating the ocean of code and diving into the web ecosystem as calmly as a duck on a lake",
    url: "https://brian-duckyfolio.vercel.app",
    siteName: "Duckfolio",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <WaveTransition>{children}</WaveTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}