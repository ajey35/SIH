"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import {
  Home,
  TreePine,
  FileText,
  Award,
  Users,
  Shield,
  Settings,
  Upload,
  CheckCircle,
  BarChart3,
  MapPin,
} from "lucide-react"

const navigationItems = {
  NGO: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Available Sites", href: "/dashboard/sites", icon: MapPin }, // Added plantation sites for NGOs
    { name: "My Projects", href: "/dashboard/projects", icon: TreePine },
    { name: "Submit Proposal", href: "/dashboard/proposals/new", icon: FileText },
    { name: "Carbon Credits", href: "/dashboard/credits", icon: Award },
  ],
  Panchayat: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Sites", href: "/dashboard/sites", icon: MapPin }, // Added plantation sites management for Panchayats
    { name: "Assigned Projects", href: "/dashboard/projects", icon: TreePine },
    { name: "Submit Reports", href: "/dashboard/data/report-submission", icon: FileText },
    { name: "Project Status", href: "/dashboard/status", icon: BarChart3 },
  ],
  Verifier: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Review Queue", href: "/dashboard/reviews", icon: CheckCircle },
    { name: "Verified Projects", href: "/dashboard/verified", icon: Shield },
    { name: "Credit Validation", href: "/dashboard/credits", icon: Award },
  ],
  Admin: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "User Management", href: "/dashboard/users", icon: Users },
    { name: "Project Oversight", href: "/dashboard/projects", icon: TreePine },
    { name: "Credit Registry", href: "/dashboard/credits", icon: Award },
    { name: "System Settings", href: "/dashboard/settings", icon: Settings },
  ],
}

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user || !pathname.startsWith("/dashboard")) {
    return null
  }

  const items = navigationItems[user.role as keyof typeof navigationItems] || []

  return (
    <div className="hidden lg:block w-64 lg:w-72 bg-gradient-to-br from-sidebar via-sidebar to-sidebar/90 border-r border-sidebar-border/50 h-screen sticky top-0 backdrop-blur-xl shadow-2xl">
      <div className="p-4 sm:p-6 lg:p-8 border-b border-sidebar-border/30">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-sidebar-foreground">{user.role} Portal</h2>
        </div>
        <p className="text-xs sm:text-sm text-sidebar-foreground/70 font-medium truncate">{user.name}</p>
      </div>

      <nav className="p-3 sm:p-4 space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg border border-sidebar-accent/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:shadow-md hover:border hover:border-sidebar-accent/20",
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                isActive ? "opacity-100" : "group-hover:opacity-100"
              )}></div>
              <Icon className={cn(
                "mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 relative z-10",
                isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
              )} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
