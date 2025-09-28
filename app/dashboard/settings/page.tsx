"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Bell, Award } from "lucide-react"
import { TwoFactorAuth } from "@/components/auth/two-factor-auth"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    systemUpdates: true,
    verificationReminders: false,
    weeklyReports: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoApproval: false,
    maintenanceMode: false,
    publicRegistry: true,
    apiAccess: true,
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and system parameters</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Configuration
              </CardTitle>
              <CardDescription>Basic platform settings and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Blue Carbon Registry India" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-version">Version</Label>
                  <Input id="platform-version" defaultValue="v1.2.0" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Blockchain-based registry for blue carbon restoration projects in Indian coastal areas"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Registry Access</Label>
                  <p className="text-sm text-muted-foreground">Allow public viewing of verified projects</p>
                </div>
                <Switch
                  checked={systemSettings.publicRegistry}
                  onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, publicRegistry: checked }))}
                />
              </div>

              <Button>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verification Parameters
              </CardTitle>
              <CardDescription>Configure verification rules and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-verifiers">Minimum Verifiers Required</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Verifier</SelectItem>
                      <SelectItem value="2">2 Verifiers</SelectItem>
                      <SelectItem value="3">3 Verifiers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification-timeout">Verification Timeout (days)</Label>
                  <Input id="verification-timeout" type="number" defaultValue="14" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-approval-threshold">Auto-approval Threshold (hectares)</Label>
                <Input id="auto-approval-threshold" type="number" defaultValue="5" />
                <p className="text-sm text-muted-foreground">Projects below this size may be auto-approved</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Auto-approval</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve small projects</p>
                </div>
                <Switch
                  checked={systemSettings.autoApproval}
                  onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, autoApproval: checked }))}
                />
              </div>

              <Button>Save Verification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Carbon Credit Configuration
              </CardTitle>
              <CardDescription>Set carbon credit calculation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mangrove-rate">Mangrove Credit Rate (tCO2/ha/year)</Label>
                  <Input id="mangrove-rate" type="number" step="0.1" defaultValue="10.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seagrass-rate">Seagrass Credit Rate (tCO2/ha/year)</Label>
                  <Input id="seagrass-rate" type="number" step="0.1" defaultValue="8.3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="saltmarsh-rate">Salt Marsh Credit Rate (tCO2/ha/year)</Label>
                  <Input id="saltmarsh-rate" type="number" step="0.1" defaultValue="6.8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credit-validity">Credit Validity (years)</Label>
                  <Input id="credit-validity" type="number" defaultValue="10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blockchain-network">Blockchain Network</Label>
                <Select defaultValue="polygon">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>Save Credit Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for critical events</p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Notify about system maintenance and updates</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, systemUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Verification Reminders</Label>
                    <p className="text-sm text-muted-foreground">Remind verifiers about pending reviews</p>
                  </div>
                  <Switch
                    checked={notifications.verificationReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, verificationReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Send weekly platform activity reports</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Two-Factor Authentication */}
          <TwoFactorAuth />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Manage security settings and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Access</Label>
                  <p className="text-sm text-muted-foreground">Enable external API access</p>
                </div>
                <Switch
                  checked={systemSettings.apiAccess}
                  onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, apiAccess: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label>System Status</Label>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800">Database: Online</Badge>
                  <Badge className="bg-green-100 text-green-800">Blockchain: Connected</Badge>
                  <Badge className="bg-green-100 text-green-800">API: Active</Badge>
                </div>
              </div>

              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
