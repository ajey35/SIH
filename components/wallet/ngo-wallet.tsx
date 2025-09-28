"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Copy,
  ExternalLink,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  EyeOff,
  Gift,
  Award,
  TreePine,
  Users
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Logo } from "@/components/ui/logo"

interface NGOWalletProps {
  user?: {
    name: string
    role: string
  }
}

export function NGOWallet({ user }: NGOWalletProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)
  const [walletAddress] = useState("0x742d...a8b3")

  const mockData = {
    balance: 125000,
    currency: "INR",
    totalEarned: 896030,
    opportunitiesListed: 2243,
    carbonCredits: 245,
    monthlyIncome: 45000,
    monthlyExpense: 12000,
    recentTransactions: [
      {
        id: "1",
        type: "credit",
        amount: 15000,
        description: "Carbon Credits Sale - Sundarbans Project",
        status: "completed",
        date: "2 hours ago",
        category: "carbon_credits"
      },
      {
        id: "2", 
        type: "credit",
        amount: 25000,
        description: "Government Funding - Coastal Restoration",
        status: "completed",
        date: "1 day ago",
        category: "funding"
      },
      {
        id: "3",
        type: "debit",
        amount: 5000,
        description: "Equipment Purchase - Mangrove Saplings",
        status: "pending",
        date: "2 days ago",
        category: "expense"
      }
    ]
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with NGO branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo size="sm" showText={false} />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              NGO Wallet
            </h2>
            <p className="text-muted-foreground text-sm">
              {user?.name || "Environmental Organization"} • Secure Blockchain Wallet
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <TreePine className="h-3 w-3 mr-1" />
            Active NGO
          </Badge>
        </div>
      </div>

      {/* Key Metrics - Superteam Earn Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Total Value Earned</span>
                </div>
                <p className="text-3xl font-bold text-green-700">
                  ₹{mockData.totalEarned.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+12.5% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TreePine className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Projects Listed</span>
                </div>
                <p className="text-3xl font-bold text-blue-700">
                  {mockData.opportunitiesListed.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1 mt-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600">Active collaborations</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TreePine className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Wallet Section */}
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span>Current Balance</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Your secure blockchain wallet for carbon credit transactions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                {isBalanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Balance Display */}
            <div className="text-center p-6 bg-gradient-to-br from-muted/50 to-background rounded-xl border-2 border-dashed border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">BALANCE</p>
              <p className="text-4xl font-bold text-primary mb-2">
                {isBalanceVisible ? (
                  <>₹{mockData.balance.toLocaleString()}</>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-muted rounded"></div>
                    <div className="w-12 h-8 bg-muted rounded"></div>
                    <div className="w-6 h-8 bg-muted rounded"></div>
                  </div>
                )}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Blockchain Verified</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">2FA Enabled</span>
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-sm text-muted-foreground font-mono">{walletAddress}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copyAddress}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <DollarSign className="h-4 w-4" />
                <span>Withdraw</span>
              </Button>
              <Button variant="outline" className="h-12 flex items-center justify-center space-x-2 hover:bg-blue-50 hover:border-blue-200">
                <Gift className="h-4 w-4" />
                <span>Add Funds</span>
              </Button>
            </div>

            {/* Security Settings Link */}
            <div className="text-center">
              <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                Edit Two Factor Authentication
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription className="text-sm">
            Your latest carbon credit transactions and earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "credit" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {transaction.type === "credit" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1">
                    {transaction.status === "completed" ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-yellow-500" />
                    )}
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        transaction.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t mt-4">
            <Button variant="outline" className="w-full hover:bg-primary/5">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Have questions about your NGO wallet?{" "}
          <a href="mailto:support@bluecarbonregistry.in" className="text-primary hover:underline">
            support@bluecarbonregistry.in
          </a>
        </p>
      </div>
    </div>
  )
}
