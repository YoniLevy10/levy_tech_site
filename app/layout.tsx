import type { Metadata, Viewport } from "next"
import { Playfair_Display, Outfit, DM_Mono } from "next/font/google"
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

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Levy Tech — Private AI Operating Systems",
  description:
    "Levy Tech designs and deploys custom AI-powered operating systems for businesses that have outgrown spreadsheets, WhatsApp chaos and manual work.",
  keywords: ["AI", "operating systems", "business automation", "dashboards", "WhatsApp workflows"],
  authors: [{ name: "Levy Tech" }],
  openGraph: {
    title: "Levy Tech — Private AI Operating Systems",
    description: "We build operating systems, not websites.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#060606",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} ${dmMono.variable} bg-background`}>
      <body>{children}</body>
    </html>
  )
}
