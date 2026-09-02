import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Clash Display — self-hosted from Fontshare (public/fonts)
const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "../../public/fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

const siteUrl =
  site.seo.url && !site.seo.url.startsWith("TODO_")
    ? site.seo.url
    : "https://seif-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  authors: [{ name: "Seif Amr Attia" }],
  keywords: [
    "Seif Amr Attia",
    "Data Analyst",
    "Data Analytics",
    "Full-Stack Engineer",
    "Python",
    "SQL",
    "Flutter",
    "React",
  ],
  openGraph: {
    type: "website",
    title: site.seo.title,
    description: site.seo.description,
    url: siteUrl,
    siteName: "Seif Amr Attia",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The pre-paint script below stamps data-theme here before React
      // hydrates; that attribute is expected to differ from the server HTML.
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">
        {/* Applies the stored theme before first paint — no light/dark flash.
            Key must match THEME_KEY in src/lib/theme.ts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('seif-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`,
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
