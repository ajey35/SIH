"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Calendar,
  Target
} from "lucide-react"

interface WalletStatsProps {
  monthlyIncome: number
  monthlyExpense: number
  carbonCreditsEarned: number
  nextPayment: string
}

export function WalletStats({ 
  monthlyIncome = 45000, 
  monthlyExpense = 12000, 
  carbonCreditsEarned = 245,
  nextPayment = "Jan 25, 2024"
}: WalletStatsProps) {
  const netIncome = monthlyIncome - monthlyExpense
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold text-green-600">₹{monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600">+12.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-red-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Expense</p>
              <p className="text-2xl font-bold text-red-600">₹{monthlyExpense.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="h-3 w-3 text-red-500" />
            <span className="text-xs text-red-600">+5.2% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Carbon Credits</p>
              <p className="text-2xl font-bold text-blue-600">{carbonCreditsEarned}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Badge className="bg-blue-100 text-blue-800 text-xs">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Income</p>
              <p className="text-2xl font-bold text-purple-600">₹{netIncome.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Calendar className="h-3 w-3 text-purple-500" />
            <span className="text-xs text-purple-600">Next: {nextPayment}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
