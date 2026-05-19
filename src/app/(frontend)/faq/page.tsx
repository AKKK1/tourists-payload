import type { Metadata } from "next"
import { FaqPage } from "@/views/FaqPage"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about visas, safety, booking, cancellation and travel planning for Georgia.",
}

export default function Page() {
  return <FaqPage />
}
