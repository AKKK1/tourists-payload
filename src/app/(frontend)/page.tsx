import type { Metadata } from "next"
import { HomePage } from "@/views/HomePage"

export const metadata: Metadata = {
  title: "Georgia Soul Travels - Georgien-Reisen fur Anspruchsvolle",
  description: "Entdecken Sie Georgien mit lokalen Spezialisten, authentischen Touren, Bergen, Wein und Gastfreundschaft.",
}

export default function Page() {
  return <HomePage />
}
