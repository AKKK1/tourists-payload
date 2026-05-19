import type { Metadata } from "next"
import { PackagesPage } from "@/views/PackagesPage"

export const metadata: Metadata = {
  title: "Georgia Tour Package",
  description: "Explore this Georgia tour package and request a custom trip.",
}

export default function Page() {
  return <PackagesPage />
}
