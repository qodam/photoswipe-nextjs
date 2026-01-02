import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// URL de production (à ajuster si nécessaire)
const BASE_URL = "https://photoswipe.qodam.com";

// 1. Mobile Viewport (Adapté à la couleur Rose de l'app)
export const viewport: Viewport = {
  themeColor: "#f43f5e", // Rose-500
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. SEO Metadata (PhotoSwipe)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Photo Cleaner - PhotoSwipe",
    template: "%s | PhotoSwipe",
  },

  description:
    "Clean your phone gallery instantly. Swipe left to delete duplicates, screenshots, and blurry photos. Swipe right to keep memories. Free up storage space with PhotoSwipe.",

  keywords: [
    "gallery cleaner",
    "photo cleaner app",
    "remove duplicates",
    "delete screenshots",
    "storage saver",
    "clean iphone storage",
    "android gallery organizer",
    "photo swipe",
    "tinder for photos",
  ],

  authors: [{ name: "Qodam" }],
  creator: "Qodam",
  publisher: "PhotoSwipe",

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

  // 3. Open Graph (Social Media Previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "PhotoSwipe - Clean Your Gallery in Minutes",
    description:
      "Stop 'Storage Full' warnings. Swipe to organize your photos, delete duplicates, and reclaim gigabytes of space instantly.",
    siteName: "PhotoSwipe",
    images: [
      {
        url: "/logo.png", // Assure-toi d'avoir une image open-graph (1200x630 recommandé)
        width: 512,
        height: 512,
        alt: "PhotoSwipe App Interface",
      },
    ],
  },

  // 4. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "PhotoSwipe - The Fun Way to Clean Photos",
    description: "Identify and delete clutter from your gallery. Just swipe it.",
    images: ["/logo.png"],
    creator: "@qodam",
  },

  // 5. Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png", // Icône pour l'écran d'accueil iOS
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {/* Schema.org Rich Snippet pour App Mobile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "PhotoSwipe",
              operatingSystem: "iOS, Android",
              applicationCategory: "UtilitiesApplication",
              description:
                "The fastest way to clean up your iPhone or Android gallery. Swipe to organize photos and save storage space.",
              featureList: [
                "Swipe to delete photos",
                "Calendar view organization",
                "Duplicate detection",
                "Screenshot cleaner",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}