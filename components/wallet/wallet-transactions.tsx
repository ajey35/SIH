"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Wallet, 
  Clock, 
  CheckCircle,
  MoreHorizontal,
  Filter
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  status: "completed" | "pending" | "failed"
  date: string
  category: "carbon_credits" | "funding" | "expense" | "reward"
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 15000,
    description: "Carbon Credits Sale - Sundarbans Project",
    status: "completed",
    date: "2024-01-15",
    category: "carbon_credits"
  },
  {
    id: "2",
    type: "debit",
    amount: 5000,
    description: "Equipment Purchase - Mangrove Saplings",
    status: "completed",
    date: "2024-01-14",
    category: "expense"
  },
  {
    id: "3",
    type: "credit",
    amount: 25000,
    description: "Government Funding - Coastal Restoration",
    status: "completed",
    date: "2024-01-12",
    category: "funding"
  },
  {
    id: "4",
    type: "credit",
    amount: 5000,
    description: "Performance Reward - Q4 2023",
    status: "pending",
    date: "2024-01-10",
    category: "reward"
  },
  {
    id: "5",
    type: "debit",
    amount: 2000,
    description: "Field Survey Tools",
    status: "completed",
    date: "2024-01-08",
    category: "expense"
  },
  {
    id: "6",
    type: "credit",
    amount: 8000,
    description: "Carbon Credits Sale - Seagrass Initiative",
    status: "completed",
    date: "2024-01-05",
    category: "carbon_credits"
  }
]

const getTransactionIcon = (category: string, type: string) => {
  if (category === "carbon_credits") return <ArrowUpRight className="h-4 w-4" />
  if (category === "funding") return <CreditCard className="h-4 w-4" />
  if (category === "expense") return <ArrowDownLeft className="h-4 w-4" />
  if (category === "reward") return <Wallet className="h-4 w-4" />
  return type === "credit" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "failed":
      return <CheckCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
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

export function WalletTransactions() {
  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span>Recent Transactions</span>
            </CardTitle>
            <CardDescription className="text-sm">Your latest wallet activity</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group/item"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === "credit" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {getTransactionIcon(transaction.category, transaction.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </p>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      <DropdownMenuItem>Report Issue</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="pt-4 border-t mt-4">
          <Button variant="outline" className="w-full hover:bg-primary/5 transition-colors duration-200">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
