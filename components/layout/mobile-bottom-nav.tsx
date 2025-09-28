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
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Sites", href: "/dashboard/sites", icon: MapPin },
    { name: "Projects", href: "/dashboard/projects", icon: TreePine },
    { name: "Proposal", href: "/dashboard/proposals/new", icon: FileText },
    { name: "Credits", href: "/dashboard/credits", icon: Award },
  ],
  Panchayat: [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Sites", href: "/dashboard/sites", icon: MapPin },
    { name: "Projects", href: "/dashboard/projects", icon: TreePine },
    { name: "Reports", href: "/dashboard/data/report-submission", icon: FileText },
    { name: "Status", href: "/dashboard/status", icon: BarChart3 },
  ],
  Verifier: [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Reviews", href: "/dashboard/reviews", icon: CheckCircle },
    { name: "Verified", href: "/dashboard/verified", icon: Shield },
    { name: "Credits", href: "/dashboard/credits", icon: Award },
  ],
  Admin: [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Projects", href: "/dashboard/projects", icon: TreePine },
    { name: "Credits", href: "/dashboard/credits", icon: Award },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
}

export function MobileBottomNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user || !pathname.startsWith("/dashboard")) {
    return null
  }

  const items = navigationItems[user.role as keyof typeof navigationItems] || []

  return (
    <div className="mobile-bottom-nav lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mobile-bottom-nav-item",
                isActive && "active"
              )}
            >
              <Icon className="mobile-bottom-nav-icon" />
              <span className="mobile-bottom-nav-label">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
