import type { Metadata } from "next";
import { Poppins, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ToasterProvider } from "@/components/ToasterProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Anu's Sketch Studio | Hand-Drawn Portraits & Mehendi Art",
  description:
    "Professional hand-drawn portraits and mehendi designs by Anu. Transform your memories into timeless art pieces with custom hand-drawn portraits and beautiful mehendi designs.",
  keywords:
    "hand-drawn portraits, custom sketches, mehendi designs, henna art, professional artist, custom artwork, portrait artist",
  authors: [{ name: "Anu's Sketch Studio" }],
  creator: "Anu's Sketch Studio",
  publisher: "Anu's Sketch Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://anusketchart.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anu's Sketch Studio | Hand-Drawn Portraits & Mehendi Art",
    description:
      "Professional hand-drawn portraits and mehendi designs by Anu. Transform your memories into timeless art pieces.",
    url: "https://anusketchart.com",
    siteName: "Anu's Sketch Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anu's Sketch Studio - Hand-Drawn Portraits & Mehendi Art",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anu's Sketch Studio | Hand-Drawn Portraits & Mehendi Art",
    description:
      "Professional hand-drawn portraits and mehendi designs by Anu. Transform your memories into timeless art pieces.",
    images: ["/og-image.png"],
    creator: "@anusketchart",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        <link rel="icon" href="/favicon.ico" type="image/png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preload" href="/classesBg.jpg" as="image" />
      </head>
      <body
        className={`${poppins.variable} ${lexendDeca.variable} antialiased`}
      >
        {children}
        <ToasterProvider />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Anu's Sketch Studio",
              image: "https://anusketchart.com/og-image.png",
              description:
                "Professional hand-drawn portraits and mehendi designs by Anu. Transform your memories into timeless art pieces.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              url: "https://anusketchart.com",
              telephone: "+9152345333",
              priceRange: "₹₹",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "10:00",
                closes: "19:00",
              },
              sameAs: [
                "https://www.instagram.com/anusketchart/",
                "https://wa.me/9152345333/?text=hello%20Anu,%20I%20had%20some%20queries%20regarding%20the%20sketch%20and%20canvas%20painting!",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
