"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  Smartphone, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Copy,
  QrCode,
  X,
  Minus
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Enhanced2FAModalProps {
  isOpen: boolean
  onClose: () => void
  onSetupComplete?: () => void
  isSetup?: boolean
}

export function Enhanced2FAModal({ 
  isOpen, 
  onClose, 
  onSetupComplete, 
  isSetup = false 
}: Enhanced2FAModalProps) {
  const [step, setStep] = useState<"choose" | "setup" | "verify" | "complete">("choose")
  const [selectedMethod, setSelectedMethod] = useState<"passkey" | "authenticator">("authenticator")
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
    setStep("choose")
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
    })
  }

  const resetModal = () => {
    setStep("choose")
    setVerificationCode("")
    setSecretKey("")
    setQrCode("")
    setIsVerifying(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">Choose a verification method</DialogTitle>
                <DialogDescription className="text-sm">
                  {step === "choose" 
                    ? "To add or delete verification methods, verification is required."
                    : step === "setup"
                    ? "Set up your authenticator app to secure your account."
                    : step === "verify"
                    ? "Enter the verification code from your authenticator app."
                    : "Two-factor authentication has been successfully enabled."
                  }
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {step === "choose" && (
            <div className="space-y-4">
              {/* Passkey Option */}
              <div 
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === "passkey" 
                    ? "border-purple-200 bg-purple-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod("passkey")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Key className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Passkey</p>
                    <p className="text-sm text-muted-foreground">Use biometric authentication</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Available</Badge>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Authenticator App Option */}
              <div 
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === "authenticator" 
                    ? "border-purple-200 bg-purple-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod("authenticator")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Authenticator app</p>
                    <p className="text-sm text-muted-foreground">Use Google Authenticator, Authy, etc.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isEnabled ? (
                    <>
                      <Badge className="bg-green-100 text-green-800 text-xs">Enabled</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          disable2FA()
                        }}
                        className="h-6 w-6 p-0 hover:bg-red-50"
                      >
                        <Minus className="h-3 w-3 text-red-500" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary" className="text-xs">Available</Badge>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => selectedMethod === "authenticator" ? setStep("setup") : null}
                className="w-full"
                disabled={selectedMethod === "passkey"}
              >
                Continue with {selectedMethod === "authenticator" ? "Authenticator App" : "Passkey"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You can always change your selection later.
              </p>
            </div>
          )}

          {step === "setup" && (
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <div className="text-sm text-blue-800">
                  Download an authenticator app like Google Authenticator or Authy, then scan the QR code or enter the secret key manually.
                </div>
              </Alert>

              <Button onClick={generateSecretKey} className="w-full">
                Generate QR Code & Secret Key
              </Button>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep("choose")} className="flex-1">
                  Back
                </Button>
              </div>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* QR Code Display */}
                <div className="p-4 border-2 border-dashed border-primary/20 rounded-lg text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Scan with your authenticator app</p>
                </div>

                {/* Secret Key */}
                <div>
                  <p className="text-sm font-medium mb-2">Secret Key</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm">
                      {secretKey}
                    </div>
                    <Button variant="outline" size="sm" onClick={copySecretKey}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Verification Code Input */}
                <div>
                  <p className="text-sm font-medium mb-2">Enter 6-digit code</p>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full p-3 text-center text-lg tracking-widest border rounded-lg font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep("setup")} className="flex-1">
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

          {step === "complete" && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-800">2FA Enabled Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  Your account is now protected with two-factor authentication.
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Close
                </Button>
                <Button onClick={() => setStep("choose")} className="flex-1">
                  Manage Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
