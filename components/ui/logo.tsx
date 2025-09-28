"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "default" | "icon-only" | "text-only"
}

export function Logo({ 
  className, 
  size = "md", 
  showText = true, 
  variant = "default" 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl", 
    xl: "text-3xl"
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {variant !== "text-only" && (
        <div className={cn("relative", sizeClasses[size])}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-full blur-lg animate-pulse"></div>
          
          {/* Main logo container with actual logo image */}
          <div className="relative w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-2xl border border-gray-300 overflow-hidden ring-1 ring-white/20">
            <Image
              src="/logo.png"
              alt="Blue Carbon Registry Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </div>
      )}
      
      {showText && variant !== "icon-only" && (
        <div className="flex flex-col">
          <span className={cn("font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent", textSizes[size])}>
            Blue Carbon Registry
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            Coastal Restoration Platform
          </span>
        </div>
      )}
    </div>
  )
}
