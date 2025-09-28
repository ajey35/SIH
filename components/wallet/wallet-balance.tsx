"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingUp, TrendingDown, Eye, EyeOff, RefreshCw } from "lucide-react"
import { useState } from "react"

interface WalletBalanceProps {
  balance: number
  currency?: string
  showDetails?: boolean
}

export function WalletBalance({ balance, currency = "INR", showDetails = true }: WalletBalanceProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Wallet Balance</CardTitle>
              <CardDescription className="text-sm">Available funds for transactions</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {isVisible ? (
                <>
                  {currency} {balance.toLocaleString()}
                </>
              ) : (
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-muted rounded"></div>
                  <div className="w-8 h-6 bg-muted rounded"></div>
                  <div className="w-4 h-6 bg-muted rounded"></div>
                </div>
              )}
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>
          
          {showDetails && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+2.5%</span>
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <Wallet className="h-4 w-4" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">Status</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
