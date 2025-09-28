"use client"

import { WalletBalance } from "./wallet-balance"
import { WalletTransactions } from "./wallet-transactions"
import { WalletActions } from "./wallet-actions"
import { WalletStats } from "./wallet-stats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Eye } from "lucide-react"

interface WalletDashboardProps {
  balance?: number
  currency?: string
}

export function WalletDashboard({ balance = 125000, currency = "INR" }: WalletDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Embedded Wallet
            </h2>
            <p className="text-muted-foreground text-sm">Secure blockchain-powered wallet for NGOs</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <Shield className="h-3 w-3" />
            <span>Verified</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <Eye className="h-3 w-3" />
            <span>Blockchain</span>
          </div>
        </div>
      </div>

      {/* Wallet Stats */}
      <WalletStats />

      {/* Main Wallet Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <WalletBalance balance={balance} currency={currency} />
        </div>

        {/* Actions Card */}
        <div className="lg:col-span-1">
          <WalletActions />
        </div>

        {/* Security & Info */}
        <div className="lg:col-span-1">
          <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 backdrop-blur-sm bg-card/80">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Security</span>
              </CardTitle>
              <CardDescription className="text-sm">Wallet security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">2FA Enabled</p>
                      <p className="text-xs text-green-600">Authenticator app</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Blockchain Verified</p>
                      <p className="text-xs text-blue-600">All transactions</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Wallet ID: 0x742d...a8b3
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transactions */}
      <WalletTransactions />
    </div>
  )
}
