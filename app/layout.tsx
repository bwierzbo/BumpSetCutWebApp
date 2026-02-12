import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BumpSetCut - AI-Powered Volleyball Rally Detection",
  description:
    "Automatically detect, extract, and share volleyball rallies from your videos. BumpSetCut uses AI to find the action so you can focus on the game.",
  keywords: [
    "volleyball",
    "rally detection",
    "AI",
    "video analysis",
    "highlight creator",
    "volleyball app",
  ],
  openGraph: {
    title: "BumpSetCut - AI-Powered Volleyball Rally Detection",
    description:
      "Automatically detect, extract, and share volleyball rallies from your videos. BumpSetCut uses AI to find the action so you can focus on the game.",
    siteName: "BumpSetCut",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BumpSetCut - AI-Powered Volleyball Rally Detection",
    description:
      "Automatically detect, extract, and share volleyball rallies from your videos. BumpSetCut uses AI to find the action so you can focus on the game.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
