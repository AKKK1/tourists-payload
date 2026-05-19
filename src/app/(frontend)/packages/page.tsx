import type { Metadata } from "next"
import { PackagesPage } from "@/views/PackagesPage"

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Compare Georgia tour packages, custom itineraries and premium local travel experiences.",
}

export default function Page() {
  return <PackagesPage />
}
