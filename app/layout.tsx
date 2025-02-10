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
  title: "Kushal Prajapati - Software Engineer | AI & Full-Stack Portfolio",
  description:
    "Explore Kushal Prajapati's portfolio showcasing expertise in Software Engineering, Artificial Intelligence, and Full-Stack Development. View projects, skills, and experience.",
  keywords: [
    "Kushal Prajapati",
    "Software Engineer",
    "AI",
    "Full-Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "University of Waterloo",
    "Computer Engineering",
    "Web Development",
    "Mobile App Development",
  ],
  authors: [{ name: "Kushal Prajapati", url: "https://kushalprajapati.me" }],
  openGraph: {
    title: "Kushal Prajapati - Software Engineer | AI & Full-Stack Portfolio",
    description:
      "Explore Kushal Prajapati's portfolio showcasing expertise in Software Engineering, Artificial Intelligence, and Full-Stack Development. View projects, skills, and experience.",
    url: "https://kushalprajapati.me",
    siteName: "Kushal Prajapati Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Prajapati - Software Engineer | AI & Full-Stack Portfolio",
    description:
      "Explore Kushal Prajapati's portfolio showcasing expertise in Software Engineering, AI, and Full-Stack Development. View projects, skills, and experience.",
    creator: "@KushalPraj", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": "large",
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "lSzkvDkFQe4neOhp4Fa00Z4NBOfJbImoKSQukgdra9c",
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
        <meta name="google-site-verification" content="lSzkvDkFQe4neOhp4Fa00Z4NBOfJbImoKSQukgdra9c" />
        <meta name="description" content="Kushal Prajapati's Portfolio - Showcasing projects and skills in software engineering, AI, and full-stack development." />
        <meta name="author" content="Kushal Prajapati" />
        <meta name="keywords" content="Kushal Prajapati, Portfolio, Software Engineer, AI, Full-Stack Developer, Projects, Skills" />
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
