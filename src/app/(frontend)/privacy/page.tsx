import type { Metadata } from "next"
import { PrivacyPage } from "@/views/PrivacyPage"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for GeorgianSoul.",
}

export default function Page() {
  return <PrivacyPage />
}
