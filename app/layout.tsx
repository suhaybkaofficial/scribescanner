import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ScribeScanner - AI-Powered Writing Style Analyzer",
  description: "Enhance your writing with ScribeScanner, an AI-powered tool that analyzes your text for style, tone, and readability. Get instant feedback and suggestions to improve your writing.",
  keywords: "writing analysis, AI writing tool, style checker, grammar correction, readability improvement",
  openGraph: {
    title: "ScribeScanner - AI-Powered Writing Style Analyzer",
    description: "Enhance your writing with ScribeScanner, an AI-powered tool that analyzes your text for style, tone, and readability.",
    type: "website",
    url: "https://scribescanner.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScribeScanner - AI-Powered Writing Style Analyzer",
    description: "Enhance your writing with ScribeScanner, an AI-powered tool that analyzes your text for style, tone, and readability.",
  },
  alternates: {
    canonical: "https://scribescanner.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
