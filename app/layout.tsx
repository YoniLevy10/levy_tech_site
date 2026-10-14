import type { Metadata, Viewport } from "next"
import { Playfair_Display, Outfit, DM_Mono, Heebo } from "next/font/google"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpsBrain — Private AI Operating Systems",
    template: "%s — OpsBrain",
  },
  description:
    "OpsBrain designs and deploys custom AI-powered operating systems for businesses that have outgrown spreadsheets, WhatsApp chaos and manual work.",
  keywords: [
    "OpsBrain",
    "AI operating systems",
    "business automation",
    "dashboards",
    "WhatsApp workflows",
    "מערכות הפעלה לעסקים",
    "אוטומציה עסקית",
  ],
  authors: [{ name: "OpsBrain" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OpsBrain — Private AI Operating Systems",
    description: "We build operating systems, not websites.",
    type: "website",
    url: SITE_URL,
    siteName: "OpsBrain",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsBrain — Private AI Operating Systems",
    description: "We build operating systems, not websites.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Do not set maximumScale — blocks pinch-zoom accessibility
  themeColor: "#060606",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${heebo.variable} ${dmMono.variable} bg-background`}
    >
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
