import type { Metadata } from "next"
import "@/index.css"
import { Providers } from "./providers"
import { SiteChrome } from "./site-chrome"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.georgiasoul.travel"),
  title: {
    default: "Georgia Soul Travels - Premium Georgia Tours",
    template: "%s | Georgia Soul Travels",
  },
  description: "Discover Georgia with a local travel specialist. Custom tours, mountain hikes, wine tastings and warm Georgian hospitality.",
  openGraph: {
    type: "website",
    siteName: "Georgia Soul Travels",
    title: "Georgia Soul Travels - Premium Georgia Tours",
    description: "Custom Georgia tours, mountain escapes, wine trips and authentic local hospitality.",
    images: ["/hero-svaneti.webp"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  )
}
