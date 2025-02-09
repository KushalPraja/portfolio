import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { Analytics } from "@vercel/analytics/react"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kushal Prajapati | Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="lSzkvDkFQe4neOhp4Fa00Z4NBOfJbImoKSQukgdra9c" />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <Navigation />
        <LoadingScreen />
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
