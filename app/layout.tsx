import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/lib/auth"
import { OutfitProvider } from "@/lib/outfit-state"
import "./globals.css"

export const metadata: Metadata = {
  title: "StyleDuel - Outfit Creation & Voting",
  description: "Create stunning outfits, participate in style challenges, and vote in fashion duels",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <OutfitProvider>
            <Navigation />
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </OutfitProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
