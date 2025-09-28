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
import { Loader2, Upload, Camera, MapPin, TreePine, CheckCircle, FileText, TrendingUp, Users } from "lucide-react"

export default function MonitoringReportPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [projectLoading, setProjectLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [project, setProject] = useState<Project | null>(null)
  const [existingReports, setExistingReports] = useState<FieldData[]>([])

  const [formData, setFormData] = useState({
    plantCount: "",
    areaCovered: "",
    survivalRate: "",
    healthScore: "",
    newPlantings: "",
    maintenanceActivities: "",
    challenges: "",
    communityParticipation: "",
    sectionLabel: "",
    latitude: "",
    longitude: "",
    description: "",
  })

  useEffect(() => {
    loadProject()
    const projectId = searchParams.get("projectId")
    if (projectId) {
      loadExistingReports(parseInt(projectId))
    }
  }, [searchParams])

  const loadProject = async () => {
    try {
      const projects = await mockApi.getProjects()
      const projectId = searchParams.get("projectId")
      const foundProject = projects.find(p => p.id === parseInt(projectId || "0"))
      if (foundProject) {
        setProject(foundProject)
      } else {
        setError("Project not found")
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
      const projectReports = fieldData.filter(f => f.projectId === projectId && f.dataType === "monitoring")
      setExistingReports(projectReports)
    } catch (err) {
      console.error("Failed to load existing reports")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || user.role !== "NGO" || !project) return

    setLoading(true)
    setError("")

    try {
      // Upload monitoring field data
      await mockApi.uploadFieldData({
        projectId: project.id,
        uploadedBy: user.id,
        dataType: "monitoring",
        plantCount: parseInt(formData.plantCount),
        areaCovered: parseFloat(formData.areaCovered),
        survivalRate: parseFloat(formData.survivalRate),
        healthScore: parseFloat(formData.healthScore),
        images: ["monitoring_photo1.jpg", "monitoring_photo2.jpg", "progress_drone.jpg"], // Mock images
        sectionLabel: formData.sectionLabel,
        coordinates: {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude)
        }
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/projects")
      }, 2000)
    } catch (err) {
      setError("Failed to upload monitoring report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "NGO") {
    return (
      <div className="p-8">
        <Alert>
          <AlertDescription>Access denied. Only NGOs can upload monitoring reports.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (projectLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>Project not found or you don't have access to it.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (success) {
    return (
      <div className="p-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Monitoring Report Uploaded Successfully!</CardTitle>
            <CardDescription>Your progress data is now under verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your monitoring report has been uploaded and will be reviewed by our verification team.
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
          <h1 className="text-2xl sm:text-3xl font-bold">Upload Monitoring Report</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Document progress and current state of your restoration project
          </p>
        </div>

        {/* Project Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="mr-2 h-5 w-5" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Project:</span>
                <p className="font-medium">{project.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{project.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Ecosystem:</span>
                <p className="font-medium">{project.ecosystemType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Area:</span>
                <p className="font-medium">{project.areaHectares} hectares</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Reports */}
        {existingReports.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Previous Monitoring Reports
              </CardTitle>
              <CardDescription>Your previous progress reports for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {existingReports.map((report, index) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Report #{index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.plantCount} plants • {report.survivalRate}% survival • {report.healthScore} health score
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded: {report.uploadedAt}
                      </p>
                    </div>
                    <Badge variant={report.status === "verified" ? "default" : "secondary"}>
                      {report.status === "verified" ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Current Measurements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Current Measurements
              </CardTitle>
              <CardDescription>Document the current state and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantCount">Total Plant Count *</Label>
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

          {/* Activities and Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Activities and Progress</CardTitle>
              <CardDescription>Document recent activities and progress made</CardDescription>
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

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Location Details
              </CardTitle>
              <CardDescription>Precise location information for this monitoring report</CardDescription>
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
              <CardDescription>Upload photos showing current progress and conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-primary/50 transition-colors">
                <Camera className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Upload progress photos and drone images</p>
                <p className="text-xs text-muted-foreground mb-4">Include: Plant growth, maintenance activities, community participation, challenges</p>
                <Button variant="outline" type="button" className="w-full sm:w-auto">
                  Choose Images
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * For demo purposes, monitoring images are automatically attached
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
                <Label htmlFor="description">Monitoring Report Notes</Label>
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
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Monitoring Report
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
