import type { Metadata } from "next"
import { Suspense } from "react"
import { BookingPage } from "@/views/BookingPage"

export const metadata: Metadata = {
  title: "Request a Georgia Trip",
  description: "Send a Georgia tour request and receive a personal response within 24 hours.",
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookingPage />
    </Suspense>
  )
}