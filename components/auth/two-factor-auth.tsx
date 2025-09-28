"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Smartphone, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Download,
  QrCode
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TwoFactorAuthProps {
  onSetupComplete?: () => void
  isSetup?: boolean
}

export function TwoFactorAuth({ onSetupComplete, isSetup = false }: TwoFactorAuthProps) {
  const [step, setStep] = useState<"setup" | "verify" | "complete">("setup")
  const [secretKey, setSecretKey] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isEnabled, setIsEnabled] = useState(isSetup)

  const generateSecretKey = () => {
    // Generate a mock secret key (in real app, this would come from backend)
    const key = "JBSWY3DPEHPK3PXP"
    setSecretKey(key)
    setQrCode(`otpauth://totp/BlueCarbonRegistry:user@example.com?secret=${key}&issuer=BlueCarbonRegistry`)
    setStep("verify")
  }

  const verifyCode = async () => {
    setIsVerifying(true)
    
    // Mock verification (in real app, verify with backend)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (verificationCode.length === 6) {
      setIsEnabled(true)
      setStep("complete")
      onSetupComplete?.()
      toast({
        title: "2FA Enabled Successfully",
        description: "Two-factor authentication has been enabled for your account.",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code from your authenticator app.",
        variant: "destructive",
      })
    }
    
    setIsVerifying(false)
  }

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey)
    toast({
      title: "Copied to Clipboard",
      description: "Secret key has been copied to your clipboard.",
    })
  }

  const disable2FA = () => {
    setIsEnabled(false)
    setStep("setup")
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
    })
  }

  if (isEnabled && step === "complete") {
    return (
      <Card className="group hover:shadow-xl transition-all duration-500 border-2 border-green-200 bg-green-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-green-800">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-green-600">Enhanced security enabled</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your account is now protected with two-factor authentication. You'll need to enter a code from your authenticator app when logging in.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Authenticator App</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disable2FA}
                className="flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                Disable 2FA
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setStep("setup")}
                className="flex-1"
              >
                Reconfigure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-sm">Secure your account with 2FA</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">
            {isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {step === "setup" && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication adds an extra layer of security to your account by requiring a code from your authenticator app in addition to your password.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Authenticator App</p>
                    <p className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Backup Codes</p>
                    <p className="text-xs text-muted-foreground">Emergency access codes</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <Button onClick={generateSecretKey} className="w-full">
              Enable Two-Factor Authentication
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                Scan the QR code with your authenticator app or manually enter the secret key.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-4 border-2 border-dashed border-primary/20 rounded-lg text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Scan with your authenticator app</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setQrCode("")}
                >
                  Generate New QR Code
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="secret-key" className="text-sm font-medium">Secret Key</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="secret-key"
                      value={secretKey}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecretKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="verification-code" className="text-sm font-medium">
                    Enter 6-digit code
                  </Label>
                  <Input
                    id="verification-code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="font-mono text-center text-lg tracking-widest mt-1"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setStep("setup")}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={verifyCode}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="flex-1"
              >
                {isVerifying ? "Verifying..." : "Verify & Enable"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
