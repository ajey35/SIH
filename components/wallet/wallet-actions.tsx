"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Send, 
  Download, 
  Upload, 
  CreditCard, 
  QrCode,
  Plus,
  ArrowRight
} from "lucide-react"

export function WalletActions() {
  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 backdrop-blur-sm bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription className="text-sm">Common wallet operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-200 transition-all duration-300"
          >
            <Send className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Send</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
          >
            <Download className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Receive</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-200 transition-all duration-300"
          >
            <CreditCard className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Pay</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300"
          >
            <QrCode className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium">QR Code</span>
          </Button>
        </div>
        
        <div className="pt-4 border-t mt-4 space-y-2">
          <Button className="w-full justify-between group" variant="outline">
            <span className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Funds</span>
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button className="w-full justify-between group" variant="outline">
            <span className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Withdraw</span>
            </span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
