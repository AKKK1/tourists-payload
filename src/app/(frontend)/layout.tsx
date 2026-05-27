import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "@/index.css"
import { Providers } from "./providers"
import { SiteChrome } from "./site-chrome"

export const metadata: Metadata = {
  metadataBase: new URL("https://georgiansoul.online"),
  applicationName: "GeorgianSoul",
  title: {
    default: "GeorgianSoul - Premium Georgia Tours",
    template: "%s | GeorgianSoul",
  },
  description: "Discover Georgia with a local travel specialist. Custom tours, mountain hikes, wine tastings and warm Georgian hospitality.",
  verification: {
    google: "NJ5H9CO2m6W0qSbf8APDIdkagHNG7XDDfxPRncfgqnI",
  },
  icons: {
    icon: "/gori-fortress-favicon.svg",
    shortcut: "/gori-fortress-favicon.svg",
    apple: "/gori-fortress-favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "GeorgianSoul",
    title: "GeorgianSoul - Premium Georgia Tours",
    description: "Custom Georgia tours, mountain escapes, wine trips and authentic local hospitality.",
    images: ["/hero-svaneti.webp"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
