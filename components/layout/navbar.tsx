"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Wallet, Eye } from "lucide-react"
import { useState } from "react"
import { Logo } from "@/components/ui/logo"
import { Badge } from "@/components/ui/badge"
import { NGOWalletModal } from "@/components/wallet/ngo-wallet-modal"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    setIsProfileOpen(false) // Close the dropdown
    try {
      await logout() // clears user & redirects to /login
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between">
          
          {/* Logo */}

          <Link href="/" className="group">
            <Logo size="md" className="group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Right Side: Wallet (NGOs only) & User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Wallet Icon - Only for authenticated NGOs */}
                {user && user.role === "NGO" && user.status === "verified" && (
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300"
                    onClick={() => {
                      if (user && user.role === "NGO" && user.status === "verified") {
                        setIsWalletModalOpen(true)
                      }
                    }}
                  >
                    <Wallet className="h-5 w-5 text-primary" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-green-500 text-white rounded-full flex items-center justify-center">
                      ₹0
                    </Badge>

          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/30 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Waves className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
            <span className="font-bold text-base sm:text-lg md:text-2xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              <span className="hidden sm:inline">Blue Carbon Registry</span>
              <span className="sm:hidden">BCR</span>
            </span>
          </Link>

          {/* Right Side: User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-primary/10 transition-all duration-300">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-xs sm:text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                  </Button>
                )}

                {/* User Profile - Shows for ALL authenticated users */}
                <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300"
                      title={`${user.name}'s Profile (Click for logout)`}
                    >
                      <Avatar className="h-8 w-8 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 p-2" align="end">
                    <div className="px-3 py-2 border-b border-border/50">
                      <div className="font-semibold text-sm truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </div>

                    <DropdownMenuItem asChild>
                      <Link 
                        href="/dashboard" 
                        className="flex items-center px-3 py-2 my-1 rounded-md hover:bg-primary/5 cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link 
                        href="/dashboard/settings" 
                        className="flex items-center px-3 py-2 my-1 rounded-md hover:bg-primary/5 cursor-pointer"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <div className="border-t border-border/50 my-1"></div>
                    
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      disabled={isLoggingOut}
                      className="flex items-center px-3 py-2 my-1 rounded-md hover:bg-destructive/10 text-destructive hover:text-destructive-foreground disabled:opacity-50 disabled:cursor-not-allowed font-medium bg-destructive/5 border border-destructive/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="text-sm font-bold">
                        {isLoggingOut ? "Logging out..." : "LOGOUT"}
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" className="text-xs sm:text-sm" asChild>
                  <Link href="/register">
                    <span className="hidden sm:inline">Register</span>
                    <span className="sm:hidden">Join</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* NGO Wallet Modal - Only for authenticated NGOs */}
      {user && user.role === "NGO" && user.status === "verified" && (
        <NGOWalletModal 
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
          user={user}
        />
      )}
    </nav>
  )
}
