import type { Metadata } from "next"
import { GalleryPage } from "@/views/GalleryPage"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Georgia tours, mountains, guesthouses, wine regions and destinations.",
}

export default function Page() {
  return <GalleryPage />
}
