import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define common metadata text with specific description
const siteInfo = {
  title: "Kushal Prajapati - AI & Full-Stack Engineer | Portfolio",
  description: "Computer Engineer specialized in AI and Full-Stack development. Expert in Python, JavaScript, and modern web technologies. University of Waterloo student building innovative solutions.",
  url: "https://kushalprajapati.me",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: siteInfo.title,
  description: siteInfo.description,
  
  // Consolidated icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
  },

  // Single keywords array
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

  authors: [{ name: "Kushal Prajapati", url: siteInfo.url }],

  // Consolidated OpenGraph and Twitter metadata
  openGraph: {
    ...siteInfo,
    siteName: "Kushal Prajapati Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/favicon.png", width: 192, height: 192, alt: "Kushal Prajapati" }],
    description: siteInfo.description, // Ensure OG description matches
  },

  twitter: {
    card: "summary_large_image",
    ...siteInfo,
    creator: "@KushalPraj",
    description: siteInfo.description, // Ensure Twitter description matches
  },

  // Rest of the metadata
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
    canonical: siteInfo.url,
    types: {
      'application/xml': [{ url: 'sitemap.xml', title: 'Sitemap' }],
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
        {/* Force meta description */}
        <meta
          name="description"
          content={siteInfo.description}
          key="description"
        />
        <meta
          property="og:description"
          content={siteInfo.description}
          key="og:description"
        />
        <meta
          name="twitter:description"
          content={siteInfo.description}
          key="twitter:description"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              ...siteInfo,
              "image": `${siteInfo.url}/favicon.png`,
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
