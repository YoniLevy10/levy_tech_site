import type { Metadata, Viewport } from "next"
import Script from "next/script"
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
    default: "OpsBrain — מערכות עסקיות, AI ואוטומציה",
    template: "%s — OpsBrain",
  },
  description:
    "OpsBrain בונה לעסקים מערכות פנימיות, פתרונות AI ואוטומציות — כדי לחסוך זמן, להפחית עבודה ידנית ולייעל תהליכים.",
  keywords: [
    "OpsBrain",
    "מערכות עסקיות",
    "אוטומציה עסקית",
    "פתרונות AI לעסקים",
    "פיתוח מערכות",
    "דשבורדים",
    "custom business systems",
    "business automation",
    "AI solutions",
  ],
  authors: [{ name: "OpsBrain" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OpsBrain — מערכות עסקיות, AI ואוטומציה",
    description: "מערכות מותאמות לעסק שלכם — שחוסכות זמן ומפחיתות עבודה ידנית.",
    type: "website",
    url: SITE_URL,
    siteName: "OpsBrain",
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsBrain — מערכות עסקיות, AI ואוטומציה",
    description: "מערכות מותאמות לעסק שלכם — שחוסכות זמן ומפחיתות עבודה ידנית.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe8dc" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2622" },
  ],
}

const themeBoot = `(function(){try{var t=localStorage.getItem("opsbrain-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#2a2622":"#efe8dc")}catch(e){document.documentElement.dataset.theme="light"}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      className={`${playfair.variable} ${outfit.variable} ${heebo.variable} ${dmMono.variable} bg-background`}
    >
      <body className="rtl">
        <Script id="opsbrain-theme" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
