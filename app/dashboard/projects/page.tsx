"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { mockApi, type Project, type User } from "@/lib/mockApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Search, Plus, MapPin, Calendar, Leaf, Upload, TreePine, TrendingUp } from "lucide-react"

export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [allFieldData, setAllFieldData] = useState<
    Array<{
      id: number
      projectId: number
      uploadedBy: number
      status: "pending_verification" | "verified" | "rejected"
      uploadedAt: string
      sectionLabel?: string
      coordinates?: { lat: number; lng: number }
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, usersData, fieldData] = await Promise.all([
          mockApi.getProjects(),
          mockApi.getUsers(),
          mockApi.getFieldData(),
        ])
        setProjects(projectsData)
        setUsers(usersData)
        setAllFieldData(fieldData)
      } catch (error) {
        console.error("[v0] Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (!user) return null

  const filteredProjects = projects.filter((project) => {
    if (user.role === "NGO") {
      return project.ngoId === user.id
    } else if (user.role === "Panchayat") {
      return project.panchayatId === user.id
    }
    return project.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "baseline_uploaded":
        return "bg-blue-100 text-blue-800"
      case "plantation_started":
        return "bg-purple-100 text-purple-800"
      case "monitoring":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-emerald-100 text-emerald-800"
      case "pending_verification":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getWorkflowActions = (project: Project) => {
    if (user?.role !== "NGO") return null

    const actions = []
    
    if (project.status === "approved") {
      actions.push({
        label: "Upload Baseline",
        href: `/dashboard/projects/baseline?projectId=${project.id}`,
        variant: "default" as const,
        icon: "Upload"
      })
    }
    
    if (project.status === "baseline_uploaded") {
      actions.push({
        label: "Start Plantation",
        href: `/dashboard/projects/start?projectId=${project.id}`,
        variant: "default" as const,
        icon: "TreePine"
      })
    }
    
    if (project.status === "plantation_started" || project.status === "monitoring") {
      actions.push({
        label: "Upload Monitoring",
        href: `/dashboard/projects/monitoring?projectId=${project.id}`,
        variant: "outline" as const,
        icon: "TrendingUp"
      })
    }
    
    return actions
  }

  const getPanchayatName = (panchayatId: number) => {
    const panchayat = users.find((u) => u.id === panchayatId && u.role === "Panchayat")
    return panchayat?.name || "Unknown"
  }

  const getNGOName = (ngoId: number) => {
    const ngo = users.find((u) => u.id === ngoId && u.role === "NGO")
    return ngo?.name || "Unknown"
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 lg:mb-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {user.role === "NGO" ? "My Projects" : "Assigned Projects"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {user.role === "NGO"
              ? "Manage your restoration projects and track progress"
              : "View projects you're collaborating on and upload field data"}
          </p>
        </div>
        {user.role === "NGO" && (
          <Button asChild className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/dashboard/proposals/new">
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Link>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card className="mb-4 sm:mb-6 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {filteredProjects.map((project) => {
          const projectField = allFieldData
            .filter((f) => f.projectId === project.id)
            .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1))[0]

          return (
            <Card key={project.id} className="hover:shadow-xl transition-all duration-300 border-border/50 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>{project.status.replace("_", " ")}</Badge>
                </div>
                <CardDescription>{project.ecosystemType} Restoration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Started: {new Date(project.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Leaf className="mr-2 h-4 w-4" />
                  {project.areaHectares} hectares
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Carbon Credits Progress</span>
                    <span>
                      {project.carbonCreditsIssued}/{project.carbonCreditsTarget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(project.carbonCreditsIssued / project.carbonCreditsTarget) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    {user.role === "NGO"
                      ? `Partner: ${getPanchayatName(project.panchayatId)}`
                      : `NGO: ${getNGOName(project.ngoId)}`}
                  </p>
                </div>

                {user.role === "NGO" && projectField && (
                  <div className="rounded-md border p-3">
                    <p className="text-sm font-medium">Latest Field Upload</p>
                    <p className="text-xs text-muted-foreground">
                      {projectField.sectionLabel ? `Section ${projectField.sectionLabel}` : "Section: —"}
                      {projectField.coordinates
                        ? ` • ${projectField.coordinates.lat.toFixed(3)}, ${projectField.coordinates.lng.toFixed(3)}`
                        : " • Coordinates: —"}
                      {` • Status: ${projectField.status.replace("_", " ")}`}
                    </p>
                  </div>
                )}

                {user.role === "Panchayat" ? (
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/dashboard/data/report-submission?projectId=${project.id}`}>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Report
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    {getWorkflowActions(project)?.map((action, index) => (
                      <Button 
                        key={index}
                        variant={action.variant} 
                        className="w-full" 
                        asChild
                      >
                        <Link href={action.href}>
                          {action.icon === "Upload" && <Upload className="mr-2 h-4 w-4" />}
                          {action.icon === "TreePine" && <TreePine className="mr-2 h-4 w-4" />}
                          {action.icon === "TrendingUp" && <TrendingUp className="mr-2 h-4 w-4" />}
                          {action.label}
                        </Link>
                      </Button>
                    ))}
                    {(!getWorkflowActions(project) || getWorkflowActions(project)?.length === 0) && (
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No projects found</p>
              <p className="text-sm">
                {user.role === "NGO"
                  ? "Start by submitting your first restoration proposal"
                  : "Projects will appear here once assigned to your Panchayat"}
              </p>
            </div>
            {user.role === "NGO" && (
              <Button asChild>
                <Link href="/dashboard/proposals/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit First Proposal
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Projects Table (Alternative View) */}
      {filteredProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Detailed view of all your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.ecosystemType}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.areaHectares} ha</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>{project.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      {project.carbonCreditsIssued}/{project.carbonCreditsTarget}
                    </TableCell>
                    <TableCell>
                      {user.role === "Panchayat" ? (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/dashboard/data/upload">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
