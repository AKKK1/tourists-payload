import type { Metadata } from "next"
import { TermsPage } from "@/views/TermsPage"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for Georgia Soul Travels.",
}

export default function Page() {
  return <TermsPage />
}
