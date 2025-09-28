"use client"

import type React from "react"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <main className="flex-1 lg:ml-0 overflow-x-hidden mobile-padding">
        <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 xl:p-8 pt-20 lg:pt-6">
          <div className="min-h-[calc(100vh-5rem)] bg-background/50 backdrop-blur-sm rounded-2xl border border-border/20 mobile-card-shadow">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  )
}
