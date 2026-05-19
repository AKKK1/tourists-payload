import type { Metadata } from "next"
import { WhyGeorgiaPage } from "@/views/WhyGeorgiaPage"

export const metadata: Metadata = {
  title: "Why Georgia",
  description: "Why Georgia is one of Europe's most memorable destinations for nature, food, wine and culture.",
}

export default function Page() {
  return <WhyGeorgiaPage />
}
