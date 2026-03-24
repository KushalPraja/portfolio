import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme-context";
import Background from "@/components/background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteInfo = {
  title: "Kushal Prajapati",
  description: "Computer Engineer at the University of Waterloo.",
  url: "https://kushalprajapati.me",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content={siteInfo.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              ...siteInfo,
              sameAs: ["https://github.com/KushalPraja", "https://linkedin.com/in/KushalPraja", "https://twitter.com/KushalPraj"],
              jobTitle: "Computer Engineer",
              worksFor: {
                "@type": "Organization",
                name: "University of Waterloo",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Waterloo",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/*
          All three Google fonts are loaded; to test, open your inspector
          and adjust the `font-family` property on the `html` or `body` element:

            font-family: var(--font-sora), system-ui, sans-serif;
            font-family: var(--font-poppins), system-ui, sans-serif;
            font-family: var(--font-jost), system-ui, sans-serif;

          Once you settle on one, remove the unused imports/variables above.
        */}
        <ThemeProvider>
          <Background />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
