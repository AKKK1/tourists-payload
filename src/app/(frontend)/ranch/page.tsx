import type { Metadata } from "next"
import { RanchPage } from "@/views/RanchPage"

export const metadata: Metadata = {
  title: "Georgia Ranch Experience",
  description: "Horse riding, highland ranch experiences and peaceful nature trips in Georgia.",
}

export default function Page() {
  return <RanchPage />
}
