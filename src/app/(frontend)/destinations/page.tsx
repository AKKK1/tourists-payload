import type { Metadata } from "next"
import { DestinationsPage } from "@/views/DestinationsPage"

export const metadata: Metadata = {
  title: "Destinations in Georgia",
  description: "Explore Svaneti, Kazbegi, Kakheti, Tbilisi and Georgia travel destinations.",
}

export default function Page() {
  return <DestinationsPage />
}
