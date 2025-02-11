import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteInfo = {
  title: "Kushal Prajapati - AI & Full-Stack Engineer | Portfolio",
  description: "Computer Engineer specialized in AI and Full-Stack development. Expert in Python, JavaScript, and modern web technologies. University of Waterloo student building innovative solutions.",
  url: "https://kushalprajapati.me",
  image: "/favicon.png",
  author: "Kushal Prajapati",
  keywords: [
    "Kushal Prajapati",
    "Software Engineer",
    "AI",
    "Full-Stack Developer",
    "University of Waterloo",
    "Computer Engineering",
    "Web Development",
    "Machine Learning",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  ...siteInfo,  
  
  icons: [{ url: siteInfo.image, type: 'image/png', sizes: '192x192' }],
  
  authors: [{ name: siteInfo.author, url: siteInfo.url }],
  verification: {
    google: "lSzkvDkFQe4neOhp4Fa00Z4NBOfJbImoKSQukgdra9c",
  },
  robots: "index, follow",
  keywords: siteInfo.keywords.join(", "),

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={siteInfo.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              ...siteInfo,
              "sameAs": [
                "https://github.com/KushalPraja",
                "https://linkedin.com/in/KushalPraja",
                "https://twitter.com/KushalPraj"
              ],
              "jobTitle": "Computer Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "University of Waterloo"
              },
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
