"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  QrCode,
  Plus,
  Minus
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface NGOWalletModalProps {
  isOpen: boolean
  onClose: () => void
  user?: {
    name: string
    role: string
  }
}

export function NGOWalletModal({ isOpen, onClose, user }: NGOWalletModalProps) {
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
        category: "carbon_credits",
        hash: "0x1234...5678"
      },
      {
        id: "2", 
        type: "credit",
        amount: 25000,
        description: "Government Funding - Coastal Restoration",
        status: "completed",
        date: "1 day ago",
        category: "funding",
        hash: "0x2345...6789"
      },
      {
        id: "3",
        type: "debit",
        amount: 5000,
        description: "Equipment Purchase - Mangrove Saplings",
        status: "pending",
        date: "2 days ago",
        category: "expense",
        hash: "0x3456...7890"
      },
      {
        id: "4",
        type: "credit",
        amount: 8000,
        description: "Carbon Credits Sale - Seagrass Initiative",
        status: "completed",
        date: "3 days ago",
        category: "carbon_credits",
        hash: "0x4567...8901"
      },
      {
        id: "5",
        type: "credit",
        amount: 12000,
        description: "Performance Reward - Q4 2023",
        status: "completed",
        date: "1 week ago",
        category: "reward",
        hash: "0x5678...9012"
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

  const getTransactionIcon = (category: string, type: string) => {
    if (category === "carbon_credits") return <TreePine className="h-4 w-4" />
    if (category === "funding") return <CreditCard className="h-4 w-4" />
    if (category === "expense") return <ArrowDownLeft className="h-4 w-4" />
    if (category === "reward") return <Award className="h-4 w-4" />
    return type === "credit" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 text-xs">Failed</Badge>
      default:
        return <Badge variant="secondary" className="text-xs">Unknown</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{user?.name || "NGO"}'s Wallet</DialogTitle>
                <DialogDescription className="text-sm">
                  Secure blockchain wallet for carbon credit transactions
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <TreePine className="h-3 w-3 mr-1" />
                NGO
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-muted-foreground">Total Value Earned</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">
                      ₹{mockData.totalEarned.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">+12.5% this month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <TreePine className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-muted-foreground">Projects Listed</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">
                      {mockData.opportunitiesListed.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-600">Active collaborations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="p-6 bg-gradient-to-br from-muted/50 to-background rounded-xl border-2 border-dashed border-primary/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">BALANCE</p>
                <p className="text-4xl font-bold text-primary mb-4">
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
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
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
                        {getTransactionIcon(transaction.category, transaction.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground font-mono">{transaction.hash}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        transaction.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <ArrowUpRight className="h-5 w-5" />
                <span className="text-sm">Send</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200">
                <ArrowDownLeft className="h-5 w-5" />
                <span className="text-sm">Receive</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Pay</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200">
                <QrCode className="h-5 w-5" />
                <span className="text-sm">QR Code</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Button className="w-full justify-between group" variant="outline">
                <span className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Funds</span>
                </span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button className="w-full justify-between group" variant="outline">
                <span className="flex items-center space-x-2">
                  <Minus className="h-4 w-4" />
                  <span>Withdraw</span>
                </span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                Edit Two Factor Authentication
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
