import type { Metadata } from "next"
import { AboutPage } from "@/views/AboutPage"

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Georgia Soul Travels, a local Georgia travel team creating authentic tours.",
}

export default function Page() {
  return <AboutPage />
}
