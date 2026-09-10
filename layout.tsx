import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { content } from "@/lib/content"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  generator: "v0.app",
  keywords: [
    "Puttam Bhanu Prakash",
    "AI/ML Engineer",
    "Full Stack Developer",
    "CSE Student",
    "SriCity International University",
    "Portfolio",
  ],
  authors: [{ name: content.profile.name }],
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    type: "profile",
    locale: "en_IN",
    siteName: content.profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.title,
    description: content.seo.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d12" },
  ],
}

const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.remove('dark','light');c.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('dark');}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
