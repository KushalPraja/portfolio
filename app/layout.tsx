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
    "Machine Learning",
    "Projects", // Added general keyword for projects
    "Contact", // Added general keyword for contact
  ],
  authors: [{ name: "Kushal Prajapati", url: "https://kushalprajapati.me" }],
  openGraph: {
    title: "Kushal Prajapati - AI & Full-Stack Engineer | Portfolio",
    description:
      "Explore the portfolio of Kushal Prajapati, a Computer Engineer passionate about AI and full-stack development. Discover innovative projects and technical skills.",
    url: "https://kushalprajapati.me",
    siteName: "Kushal Prajapati Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kushalprajapati.me/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Kushal Prajapati Portfolio",
      },
    ],  
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Prajapati - Software Engineer | AI & Full-Stack Portfolio",
    description:
      "Computer Engineer, AI enthusiast, and full-stack developer with expertise in Python, JavaScript, and web development. Passionate about leveraging technology to solve real-world challenges." ,
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
        <meta name="description" content="Computer Engineer, AI enthusiast, and full-stack developer with expertise in Python, JavaScript, and web development. Passionate about leveraging technology to solve real-world challenges." />
        <meta name="author" content="Kushal Prajapati" />
        <meta name="keywords" content="Kushal Prajapati, KUSHAL PRAJAPATI, Portfolio, Software Engineer, AI, Full-Stack Developer, Projects, Skills, Kushal" />
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
