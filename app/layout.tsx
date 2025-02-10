import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kushalprajapati.me'),
  title: "Kushal Prajapati - Software Engineer | AI & Full-Stack Portfolio",
  description: "Computer Engineer specialized in AI and Full-Stack development. Expert in Python, JavaScript, and modern web technologies. University of Waterloo student building innovative solutions.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],

  },
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
  alternates: {
    canonical: 'https://kushalprajapati.me',
    types: {
      'application/xml': [
        {
          url: 'sitemap.xml',
          title: 'Sitemap',
        },
      ],
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kushal Prajapati",
              "url": "https://kushalprajapati.me",
              "image": "https://kushalprajapati.me/favicon.png",
              "sameAs": [
                "https://github.com/yourgithub",
                "https://linkedin.com/in/yourlinkedin",
                "https://twitter.com/KushalPraj"
              ],
              "jobTitle": "Computer Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "University of Waterloo"
              },
              "description": "Computer Engineer specialized in AI and Full-Stack development. Experienced in Python, JavaScript, and modern web technologies.",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of Waterloo"
              }
            })
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
