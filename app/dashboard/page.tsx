"use client"

import { useAuth } from "@/hooks/useAuth"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  TreePine,
  Award,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Upload,
  BarChart3,
  Shield,
  Users,
  Settings,
  Globe,
} from "lucide-react"
import { mockApi } from "@/lib/mockApi"
import useSWR from "swr"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { WalletDashboard } from "@/components/wallet/wallet-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  // SWR fetching for admin stats
  const { data: users = [] } = useSWR("users", mockApi.getUsers)
  const { data: projects = [] } = useSWR("projects", mockApi.getProjects)
  const { data: credits = [] } = useSWR("credits", mockApi.getCarbonCredits)

  const totals = {
    ngos: users.filter((u) => u.role === "NGO").length,
    panchayats: users.filter((u) => u.role === "Panchayat").length,
    verifiers: users.filter((u) => u.role === "Verifier").length,
    projects: projects.length,
    creditsIssued: credits.filter((c) => c.status === "issued").reduce((sum, c) => sum + c.creditsGenerated, 0),
    pendingApprovals:
      users.filter((u) => u.status === "pending").length +
      projects.filter((p) => p.status === "pending_verification").length +
      credits.filter((c) => c.status === "pending").length,
    totalUsers: users.length,
  }

  const pendingUsers = users.filter((u) => u.status === "pending").length
  const pendingProjects = projects.filter((p) => p.status === "pending_verification").length
  const pendingCredits = credits.filter((c) => c.status === "pending").length

  // Lightweight mock analytics data
  const projectsOverTime = [
    { month: "Jan", count: 2 },
    { month: "Feb", count: 3 },
    { month: "Mar", count: 4 },
    { month: "Apr", count: 6 },
    { month: "May", count: 7 },
    { month: "Jun", count: 9 },
  ]
  const creditsOverTime = [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 120 },
    { month: "Mar", value: 150 },
    { month: "Apr", value: 200 },
    { month: "May", value: 260 },
    { month: "Jun", value: 300 },
  ]
  const verifiedCount = projects.filter((p: any) => p.status === "verified" || p.status === "approved").length
  const rejectedCount = projects.filter((p: any) => p.status === "rejected").length
  const statusPieData = [
    { name: "Verified", value: verifiedCount },
    { name: "Pending", value: pendingProjects },
    { name: "Rejected", value: rejectedCount },
  ]
  const chartColors = ["#0ea5e9", "#22c55e", "#ef4444"] // sky-500, green-500, red-500

  if (!user) return null

  // NGO Dashboard
  if (user.role === "NGO") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <TreePine className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                NGO Dashboard
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Manage your restoration projects and track carbon credits</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="group">
            <StatCard
              title="Active Projects"
              value="3"
              description="Currently running projects"
              icon={TreePine}
              trend={{ value: 12, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Carbon Credits Earned"
              value="245"
              description="Total credits generated"
              icon={Award}
              trend={{ value: 8, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard 
              title="Pending Proposals" 
              value="2" 
              description="Awaiting verification" 
              icon={FileText}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Success Rate"
              value="94%"
              description="Project approval rate"
              icon={TrendingUp}
              trend={{ value: 2, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center space-x-2">
                <TreePine className="h-5 w-5 text-primary" />
                <span>Recent Projects</span>
              </CardTitle>
              <CardDescription className="text-base">Your latest restoration initiatives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-2 rounded-xl hover:border-primary/20 transition-all duration-300 group/item gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base truncate">Sundarbans Mangrove Restoration</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">50 hectares • Mangrove ecosystem</p>
                </div>
                <Badge variant="secondary" className="group-hover/item:bg-primary/10 text-xs w-fit">Pending Verification</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-2 rounded-xl hover:border-primary/20 transition-all duration-300 group/item gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base truncate">Coastal Seagrass Initiative</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">25 hectares • Seagrass ecosystem</p>
                </div>
                <Badge className="bg-green-100 text-green-800 group-hover/item:bg-green-200 text-xs w-fit">Approved</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-2 rounded-xl hover:border-primary/20 transition-all duration-300 group/item gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base truncate">Salt Marsh Conservation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">15 hectares • Salt marsh ecosystem</p>
                </div>
                <Badge variant="outline" className="group-hover/item:bg-primary/5 text-xs w-fit">Draft</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription className="text-base">Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start h-10 sm:h-12 font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                <Link href="/dashboard/proposals/new">
                  <FileText className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">Submit New Proposal</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start h-10 sm:h-12 font-semibold border-2 hover:bg-primary/5 hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                <Link href="/dashboard/projects">
                  <TreePine className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">View All Projects</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start h-10 sm:h-12 font-semibold border-2 hover:bg-primary/5 hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                <Link href="/dashboard/credits">
                  <Award className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="truncate">Track Carbon Credits</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Wallet Dashboard */}
        <div className="mb-6 lg:mb-8">
          <WalletDashboard balance={125000} currency="INR" />
        </div>

        {/* Timeline */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription className="text-base">Latest updates on your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group/item">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-semibold">Project approved by verifier</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Coastal Seagrass Initiative • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group/item">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-semibold">Field data uploaded by Panchayat</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Sundarbans Mangrove Restoration • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group/item">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-semibold">Proposal submitted for review</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Salt Marsh Conservation • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Panchayat Dashboard
  if (user.role === "Panchayat") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Panchayat Dashboard
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Collaborate on restoration projects and upload field data</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="group">
            <StatCard title="Assigned Projects" value="2" description="Active collaborations" icon={TreePine} className="group-hover:shadow-xl transition-all duration-300" />
          </div>
          <div className="group">
            <StatCard
              title="Data Uploads"
              value="8"
              description="Field reports submitted"
              icon={Upload}
              trend={{ value: 25, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard title="Pending Reviews" value="3" description="Awaiting verification" icon={Clock} className="group-hover:shadow-xl transition-all duration-300" />
          </div>
          <div className="group">
            <StatCard
              title="Community Impact"
              value="75ha"
              description="Total area covered"
              icon={BarChart3}
              trend={{ value: 15, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Projects</CardTitle>
              <CardDescription>Projects you're collaborating on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sundarbans Mangrove Restoration</h4>
                  <p className="text-sm text-muted-foreground">Green Earth NGO • 50 hectares</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Coastal Seagrass Initiative</h4>
                  <p className="text-sm text-muted-foreground">Ocean Care NGO • 25 hectares</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Approved</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/data/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Field Data
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/projects">
                  <TreePine className="mr-2 h-4 w-4" />
                  View All Projects
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between bg-transparent">
                <Link href="/dashboard/status">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Track Progress
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Field data uploaded successfully</p>
                  <p className="text-xs text-muted-foreground">Sundarbans Mangrove Restoration • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Project collaboration started</p>
                  <p className="text-xs text-muted-foreground">Coastal Seagrass Initiative • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Data verification pending</p>
                  <p className="text-xs text-muted-foreground">Mangrove baseline survey • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Verifier Dashboard
  if (user.role === "Verifier") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Verifier Dashboard
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">Review and verify restoration projects and carbon credits</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="group">
            <StatCard title="Pending Reviews" value="5" description="Items awaiting verification" icon={Clock} className="group-hover:shadow-xl transition-all duration-300" />
          </div>
          <div className="group">
            <StatCard
              title="Verified Projects"
              value="12"
              description="Successfully verified"
              icon={CheckCircle}
              trend={{ value: 20, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Credits Validated"
              value="1,250"
              description="Carbon credits approved"
              icon={Award}
              trend={{ value: 15, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Success Rate"
              value="96%"
              description="Verification accuracy"
              icon={Shield}
              trend={{ value: 3, isPositive: true }}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        {/* Review Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Review Queue</CardTitle>
              <CardDescription>Items pending your verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sundarbans Mangrove Restoration</h4>
                  <p className="text-sm text-muted-foreground">Project proposal • Green Earth NGO</p>
                </div>
                <Badge variant="secondary">High Priority</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Field Data - Baseline Survey</h4>
                  <p className="text-sm text-muted-foreground">Data verification • Coastal Panchayat A</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Carbon Credits - 120 Credits</h4>
                  <p className="text-sm text-muted-foreground">Credit validation • Seagrass Initiative</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Review</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common verification tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/reviews">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Review Queue
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/verified">
                  <Shield className="mr-2 h-4 w-4" />
                  Verified Projects
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between bg-transparent">
                <Link href="/dashboard/credits">
                  <Award className="mr-2 h-4 w-4" />
                  Credit Validation
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Verification Activity</CardTitle>
            <CardDescription>Latest reviews and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Project approved with conditions</p>
                  <p className="text-xs text-muted-foreground">Coastal Seagrass Initiative • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Field data verified successfully</p>
                  <p className="text-xs text-muted-foreground">Mangrove baseline survey • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Carbon credits validated</p>
                  <p className="text-xs text-muted-foreground">120 credits approved • 2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  if (user.role === "Admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                NCCR Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">System oversight and carbon credit registry management</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="group">
            <StatCard title="Total NGOs" value={String(totals.ngos)} description="Registered NGOs" icon={Users} className="group-hover:shadow-xl transition-all duration-300" />
          </div>
          <div className="group">
            <StatCard
              title="Total Panchayats"
              value={String(totals.panchayats)}
              description="Local Gov bodies"
              icon={Users}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Total Verifiers"
              value={String(totals.verifiers)}
              description="Accredited verifiers"
              icon={Shield}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard title="Total Projects" value={String(totals.projects)} description="All projects" icon={TreePine} className="group-hover:shadow-xl transition-all duration-300" />
          </div>
          <div className="group">
            <StatCard
              title="Credits Issued"
              value={String(totals.creditsIssued)}
              description="tCO₂e issued"
              icon={Award}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="group">
            <StatCard
              title="Pending Approvals"
              value={String(totals.pendingApprovals)}
              description="Users/Projects/Credits"
              icon={CheckCircle}
              className="group-hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Status Legend:</span>
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
          <Badge className="bg-green-100 text-green-800">Approved</Badge>
          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        </div>

        {/* Management Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>Latest registrations and role assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Green Earth Foundation</h4>
                  <p className="text-sm text-muted-foreground">NGO registration • Mumbai, Maharashtra</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Approved</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Dr. Rajesh Kumar</h4>
                  <p className="text-sm text-muted-foreground">Verifier application • Marine Biology Expert</p>
                </div>
                <Badge variant="secondary">Pending Review</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Coastal Panchayat B</h4>
                  <p className="text-sm text-muted-foreground">Panchayat registration • Kerala</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications and system status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Verification Backlog</p>
                  <p className="text-xs text-muted-foreground">5 projects pending verification for &gt;7 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border rounded-lg border-green-200 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Credit Milestone Reached</p>
                  <p className="text-xs text-muted-foreground">3,000+ carbon credits successfully issued</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border rounded-lg border-blue-200 bg-blue-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New Integration Available</p>
                  <p className="text-xs text-muted-foreground">Blockchain verification module ready for deployment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users and roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/users?filter=pending">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Review Applications
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between bg-transparent">
                <Link href="/dashboard/users?filter=pending">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Pending Users
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">{pendingUsers}</Badge>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Oversight</CardTitle>
              <CardDescription>Monitor all restoration projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/projects">
                  <TreePine className="mr-2 h-4 w-4" />
                  All Projects
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/projects?status=flagged">
                  <Shield className="mr-2 h-4 w-4" />
                  Flagged Projects
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between bg-transparent">
                <Link href="/dashboard/projects?status=pending_verification">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Pending Projects
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">{pendingProjects}</Badge>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Registry</CardTitle>
              <CardDescription>Carbon credit management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/credits">
                  <Award className="mr-2 h-4 w-4" />
                  Credit Registry
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between bg-transparent">
                <Link href="/dashboard/credits?status=pending">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Pending Credits
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">{pendingCredits}</Badge>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification & Compliance</CardTitle>
              <CardDescription>Items awaiting verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/reviews">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Review Queue
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/dashboard/verified">
                  <Shield className="mr-2 h-4 w-4" />
                  Verified Projects
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Maps */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Maps</CardTitle>
            <CardDescription>Key trends and project locations (mock data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Projects over time (Line) */}
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2 font-medium">Projects Over Time</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectsOverTime} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke={chartColors[0]} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Credits over time (Bar) */}
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2 font-medium">Credits Issued Over Time</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={creditsOverTime} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill={chartColors[1]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Verified vs Pending vs Rejected (Pie) */}
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2 font-medium">Project Status Distribution</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Legend />
                      <Pie data={statusPieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                        {statusPieData.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Map (mock) */}
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2 font-medium">Project Locations (Map)</h4>
                <div className="relative h-56 overflow-hidden rounded-md border">
                  <img
                    alt="Map of India with project locations (mock)"
                    className="h-full w-full object-cover"
                    src="/map-of-india-with-project-locations--mock-.jpg"
                  />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Showing mock markers for demonstration. Integrate an interactive map later if needed.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Generic dashboard for other roles (placeholder)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-muted-foreground">{user.role} Dashboard - Coming Soon</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Under Development</CardTitle>
          <CardDescription>Role-specific features are being built</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your personalized {user.role} dashboard is being developed with features tailored to your role in the Blue
            Carbon Registry system.
          </p>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
