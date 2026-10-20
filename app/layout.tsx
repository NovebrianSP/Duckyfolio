import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import WaveTransition from "@/components/WaveTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duckfolio - Portofolio Novebrian",
  description: "Portofolio Next.js bertema air dan bebek",
  icons: {
    icon: "/ducky.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ThemeProvider>
          <WaveTransition>{children}</WaveTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}