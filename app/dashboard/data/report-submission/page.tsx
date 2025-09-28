"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { mockApi, type Project, type FieldData } from "@/lib/mockApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, Camera, MapPin, TreePine, CheckCircle, FileText, TrendingUp, Users, Droplets, Thermometer, Eye } from "lucide-react"

type ReportType = "baseline" | "initial" | "monitoring"

interface FormData {
  // Common fields
  plantCount: string
  areaCovered: string
  survivalRate: string
  healthScore: string
  sectionLabel: string
  latitude: string
  longitude: string
  description: string
  
  // Baseline specific
  soilCondition: string
  salinityLevel: string
  waterQuality: string
  biodiversityNotes: string
  
  // Initial specific
  initialMaintenance: string
  initialCommunityEngagement: string
  initialChallenges: string
  
  // Monitoring specific
  newPlantings: string
  maintenanceActivities: string
  challenges: string
  communityParticipation: string
}

export default function ReportSubmissionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [projectLoading, setProjectLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [existingReports, setExistingReports] = useState<FieldData[]>([])
  const [selectedReportType, setSelectedReportType] = useState<ReportType>("baseline")

  const [formData, setFormData] = useState<FormData>({
    plantCount: "",
    areaCovered: "",
    survivalRate: "",
    healthScore: "",
    sectionLabel: "",
    latitude: "",
    longitude: "",
    description: "",
    soilCondition: "",
    salinityLevel: "",
    waterQuality: "",
    biodiversityNotes: "",
    initialMaintenance: "",
    initialCommunityEngagement: "",
    initialChallenges: "",
    newPlantings: "",
    maintenanceActivities: "",
    challenges: "",
    communityParticipation: "",
  })

  useEffect(() => {
    loadProject()
    const projectId = searchParams.get("projectId")
    if (projectId) {
      loadExistingReports(parseInt(projectId))
    } else {
      // Load reports for the first project if no projectId provided
      loadExistingReports(1) // Assuming project ID 1 exists
    }
  }, [searchParams])

  const loadProject = async () => {
    try {
      const projects = await mockApi.getProjects()
      const projectId = searchParams.get("projectId")
      
      if (!projectId) {
        // If no projectId provided, show the first available project for demo
        if (projects.length > 0) {
          setProject(projects[0])
        } else {
          setError("No projects available")
        }
      } else {
        const foundProject = projects.find(p => p.id === parseInt(projectId))
        if (foundProject) {
          setProject(foundProject)
        } else {
          setError("Project not found")
        }
      }
    } catch (err) {
      setError("Failed to load project")
    } finally {
      setProjectLoading(false)
    }
  }

  const loadExistingReports = async (projectId: number) => {
    try {
      const fieldData = await mockApi.getFieldData()
      const projectReports = fieldData.filter(f => f.projectId === projectId)
      setExistingReports(projectReports)
    } catch (err) {
      console.error("Failed to load existing reports")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReportTypeChange = (value: ReportType) => {
    setSelectedReportType(value)
    // Reset form when changing report type
    setFormData({
      plantCount: "",
      areaCovered: "",
      survivalRate: "",
      healthScore: "",
      sectionLabel: "",
      latitude: "",
      longitude: "",
      description: "",
      soilCondition: "",
      salinityLevel: "",
      waterQuality: "",
      biodiversityNotes: "",
      initialMaintenance: "",
      initialCommunityEngagement: "",
      initialChallenges: "",
      newPlantings: "",
      maintenanceActivities: "",
      challenges: "",
      communityParticipation: "",
    })
  }

  const validateForm = () => {
    const requiredFields = ["plantCount", "areaCovered", "survivalRate", "healthScore", "sectionLabel", "latitude", "longitude"]
    
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`)
        return false
      }
    }

    // Type-specific validation
    if (selectedReportType === "baseline") {
      if (!formData.soilCondition || !formData.salinityLevel || !formData.waterQuality) {
        setError("Please fill in all baseline-specific fields")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !project) return

    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      const reportData = {
        projectId: project.id,
        uploadedBy: user.id,
        dataType: selectedReportType,
        plantCount: parseInt(formData.plantCount),
        areaCovered: parseFloat(formData.areaCovered),
        survivalRate: parseFloat(formData.survivalRate),
        healthScore: parseFloat(formData.healthScore),
        images: [`${selectedReportType}_photo1.jpg`, `${selectedReportType}_photo2.jpg`],
        sectionLabel: formData.sectionLabel,
        coordinates: {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude)
        }
      }

      await mockApi.uploadFieldData(reportData)

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/projects")
      }, 2000)
    } catch (err) {
      setError("Failed to submit report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "baseline": return "Baseline"
      case "initial": return "Initial"
      case "monitoring": return "Periodic Monitoring"
      default: return type
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800"
      case "pending_verification": return "bg-yellow-100 text-yellow-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Alert>
          <AlertDescription>Please log in to access this page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (projectLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Alert variant="destructive">
          <AlertDescription>Project not found or you don't have access to it.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Report Submitted Successfully!</CardTitle>
            <CardDescription>Your {getReportTypeLabel(selectedReportType)} report is now under verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your report has been submitted and will be reviewed by our verification team.
            </p>
            <Button onClick={() => router.push("/dashboard/projects")}>View My Projects</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Submit Project Report</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Document project progress and conditions for verification
          </p>
        </div>

        {/* Project Information */}
        <Card className="mb-6 sm:mb-8 mobile-card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="mr-2 h-5 w-5" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="text-xs sm:text-sm text-muted-foreground">Project:</span>
                  <p className="text-sm sm:text-base font-medium">{project.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="text-xs sm:text-sm text-muted-foreground">Location:</span>
                  <p className="text-sm sm:text-base font-medium">{project.location}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="text-xs sm:text-sm text-muted-foreground">Ecosystem:</span>
                  <p className="text-sm sm:text-base font-medium">{project.ecosystemType}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                  <span className="text-xs sm:text-sm text-muted-foreground">Area:</span>
                  <p className="text-sm sm:text-base font-medium">{project.areaHectares} hectares</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Type Selection */}
        <Card className="mb-6 sm:mb-8 mobile-card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Report Type Selection
            </CardTitle>
            <CardDescription>Choose the type of report you want to submit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select value={selectedReportType} onValueChange={handleReportTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baseline">Baseline Report</SelectItem>
                  <SelectItem value="initial">Initial Report</SelectItem>
                  <SelectItem value="monitoring">Periodic Monitoring Report</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {selectedReportType === "baseline" && "Document the initial state and conditions of the project"}
                {selectedReportType === "initial" && "Document initial activities and community engagement"}
                {selectedReportType === "monitoring" && "Document ongoing progress and maintenance activities"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Previous Reports */}
        {existingReports.length > 0 && (
          <Card className="mb-6 sm:mb-8 mobile-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Previous Reports
              </CardTitle>
              <CardDescription>Your previous submissions for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {existingReports.map((report, index) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm sm:text-base">
                          {getReportTypeLabel(report.dataType)} Report #{index + 1}
                        </p>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status === "verified" ? "Verified" : 
                           report.status === "pending_verification" ? "Pending" : "Rejected"}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {report.plantCount} plants • {report.survivalRate}% survival • {report.healthScore} health score
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {report.uploadedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Common Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Basic Measurements
              </CardTitle>
              <CardDescription>Core measurements for all report types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantCount">Plant Count *</Label>
                  <Input
                    id="plantCount"
                    type="number"
                    placeholder="5000"
                    value={formData.plantCount}
                    onChange={(e) => handleInputChange("plantCount", e.target.value)}
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Current number of plants in the area</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaCovered">Area Covered (hectares) *</Label>
                  <Input
                    id="areaCovered"
                    type="number"
                    step="0.1"
                    placeholder="50.0"
                    value={formData.areaCovered}
                    onChange={(e) => handleInputChange("areaCovered", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="survivalRate">Survival Rate (%) *</Label>
                  <Input
                    id="survivalRate"
                    type="number"
                    step="0.1"
                    placeholder="85.5"
                    value={formData.survivalRate}
                    onChange={(e) => handleInputChange("survivalRate", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthScore">Health Score (1-100) *</Label>
                  <Input
                    id="healthScore"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="75"
                    value={formData.healthScore}
                    onChange={(e) => handleInputChange("healthScore", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Baseline Specific Fields */}
          {selectedReportType === "baseline" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="mr-2 h-5 w-5" />
                  Environmental Conditions
                </CardTitle>
                <CardDescription>Baseline environmental measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soilCondition">Soil Condition *</Label>
                    <Input
                      id="soilCondition"
                      placeholder="e.g., Sandy loam, well-drained"
                      value={formData.soilCondition}
                      onChange={(e) => handleInputChange("soilCondition", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salinityLevel">Salinity Level *</Label>
                    <Input
                      id="salinityLevel"
                      placeholder="e.g., Low, Medium, High"
                      value={formData.salinityLevel}
                      onChange={(e) => handleInputChange("salinityLevel", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterQuality">Water Quality Notes *</Label>
                  <Textarea
                    id="waterQuality"
                    placeholder="Describe water quality, pH levels, clarity, etc."
                    value={formData.waterQuality}
                    onChange={(e) => handleInputChange("waterQuality", e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biodiversityNotes">Biodiversity Observations</Label>
                  <Textarea
                    id="biodiversityNotes"
                    placeholder="Document existing flora and fauna, species diversity, etc."
                    value={formData.biodiversityNotes}
                    onChange={(e) => handleInputChange("biodiversityNotes", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Initial Specific Fields */}
          {selectedReportType === "initial" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Initial Activities
                </CardTitle>
                <CardDescription>Initial project activities and community engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initialMaintenance">Initial Maintenance Activities</Label>
                  <Textarea
                    id="initialMaintenance"
                    placeholder="Describe initial maintenance work, site preparation, etc."
                    value={formData.initialMaintenance}
                    onChange={(e) => handleInputChange("initialMaintenance", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialCommunityEngagement">Community Engagement</Label>
                  <Textarea
                    id="initialCommunityEngagement"
                    placeholder="Describe community involvement, training, awareness programs, etc."
                    value={formData.initialCommunityEngagement}
                    onChange={(e) => handleInputChange("initialCommunityEngagement", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialChallenges">Initial Challenges</Label>
                  <Textarea
                    id="initialChallenges"
                    placeholder="Document any initial challenges faced during project setup"
                    value={formData.initialChallenges}
                    onChange={(e) => handleInputChange("initialChallenges", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Monitoring Specific Fields */}
          {selectedReportType === "monitoring" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Progress & Activities
                </CardTitle>
                <CardDescription>Ongoing progress and maintenance activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPlantings">New Plantings</Label>
                  <Textarea
                    id="newPlantings"
                    placeholder="Describe any new plantings, species planted, quantities, locations..."
                    value={formData.newPlantings}
                    onChange={(e) => handleInputChange("newPlantings", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceActivities">Maintenance Activities</Label>
                  <Textarea
                    id="maintenanceActivities"
                    placeholder="Describe maintenance activities: watering, weeding, protection measures, etc."
                    value={formData.maintenanceActivities}
                    onChange={(e) => handleInputChange("maintenanceActivities", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges and Issues</Label>
                  <Textarea
                    id="challenges"
                    placeholder="Document any challenges faced: weather, pests, access issues, etc."
                    value={formData.challenges}
                    onChange={(e) => handleInputChange("challenges", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communityParticipation">Community Participation</Label>
                  <Textarea
                    id="communityParticipation"
                    placeholder="Describe community involvement, volunteer participation, local engagement..."
                    value={formData.communityParticipation}
                    onChange={(e) => handleInputChange("communityParticipation", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Location Details
              </CardTitle>
              <CardDescription>Precise location information for this report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sectionLabel">Section/Plot Label *</Label>
                  <Input
                    id="sectionLabel"
                    placeholder="e.g., A1, B2, North Section"
                    value={formData.sectionLabel}
                    onChange={(e) => handleInputChange("sectionLabel", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="21.9497"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="88.2636"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Photo Documentation
              </CardTitle>
              <CardDescription>Upload photos showing current conditions and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-primary/50 transition-colors">
                <Camera className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Upload progress photos and documentation</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Include: Plant growth, environmental conditions, community activities, challenges
                </p>
                <Button variant="outline" type="button" className="w-full sm:w-auto">
                  Choose Images
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * For demo purposes, report images are automatically attached
              </p>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>Any other observations or important information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="description">Report Notes</Label>
                <Textarea
                  id="description"
                  placeholder="Additional observations, progress highlights, future plans, or important notes"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit {getReportTypeLabel(selectedReportType)} Report
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
