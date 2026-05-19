"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ""
  const isAdmin = pathname.startsWith("/admin")

  return (
    <div className="min-h-svh flex flex-col">
      {!isAdmin && <Header />}
      <div className="flex-1">{children}</div>
      {!isAdmin && <Footer />}
    </div>
  )
}
