import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Human Reset Lab | Unlearn. Relearn. Reset.",
  description: "A laboratory for understanding life and reclaiming the human essence. Deconstruct the noise and find the courage to reclaim your own subjectivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="https://unpkg.com/intasend-inlinejs-sdk@3.0.4/dist/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
