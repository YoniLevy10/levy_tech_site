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
    default: "OpsBrain — מערכות הפעלה AI לעסקים",
    template: "%s — OpsBrain",
  },
  description:
    "OpsBrain מתכננת ומפתחת מערכות הפעלה AI מותאמות אישית לעסקים — דשבורדים, אוטומציות, וואטסאפ ופורטלים במקום כאוס של אקסל והודעות.",
  keywords: [
    "OpsBrain",
    "מערכות הפעלה לעסקים",
    "אוטומציה עסקית",
    "פיתוח מערכות",
    "אוטומציות AI לעסקים",
    "דשבורדים",
    "וואטסאפ עסקי",
    "AI operating systems",
    "business automation",
  ],
  authors: [{ name: "OpsBrain" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OpsBrain — מערכות הפעלה AI לעסקים",
    description: "אנחנו בונים מערכות הפעלה, לא אתרים.",
    type: "website",
    url: SITE_URL,
    siteName: "OpsBrain",
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsBrain — מערכות הפעלה AI לעסקים",
    description: "אנחנו בונים מערכות הפעלה, לא אתרים.",
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
      lang="he"
      dir="rtl"
      className={`${playfair.variable} ${outfit.variable} ${heebo.variable} ${dmMono.variable} bg-background`}
    >
      <body className="rtl">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
