"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { mockApi } from "@/lib/mockApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, Camera, FileText, CheckCircle } from "lucide-react"

export default function DataUploadPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    projectId: "101", // Default to first project for demo
    dataType: "" as "baseline" | "monitoring" | "verification" | "",
    plantCount: "",
    areaCovered: "",
    survivalRate: "",
    healthScore: "",
    observations: "",
    images: [] as string[],
    sectionLabel: "",
    lat: "",
    lng: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || user.role !== "Panchayat") return

    setLoading(true)
    setError("")

    try {
      await mockApi.uploadFieldData({
        projectId: Number.parseInt(formData.projectId),
        uploadedBy: user.id,
        dataType: formData.dataType as "baseline" | "monitoring" | "verification",
        plantCount: Number.parseInt(formData.plantCount),
        areaCovered: Number.parseInt(formData.areaCovered),
        survivalRate: Number.parseInt(formData.survivalRate),
        healthScore: Number.parseInt(formData.healthScore),
        images: ["field1.jpg", "field2.jpg"], // Mock images
        sectionLabel: formData.sectionLabel || undefined,
        coordinates:
          formData.lat && formData.lng
            ? { lat: Number.parseFloat(formData.lat), lng: Number.parseFloat(formData.lng) }
            : undefined,
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/projects")
      }, 2000)
    } catch (err) {
      setError("Failed to upload field data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "Panchayat") {
    return (
      <div className="p-8">
        <Alert>
          <AlertDescription>Access denied. Only Panchayats can upload field data.</AlertDescription>
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
            <CardTitle>Data Uploaded Successfully!</CardTitle>
            <CardDescription>Your field data has been submitted for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your field data has been uploaded and will be reviewed by the verification team. You can track the status
              in your project dashboard.
            </p>
            <Button onClick={() => router.push("/dashboard/projects")}>View Projects</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Upload Field Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Submit monitoring data and observations from restoration sites</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Project Information
              </CardTitle>
              <CardDescription>Select the project and data type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select value={formData.projectId} onValueChange={(value) => handleInputChange("projectId", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">Sundarbans Mangrove Restoration</SelectItem>
                      <SelectItem value="102">Coastal Seagrass Initiative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataType">Data Type *</Label>
                  <Select value={formData.dataType} onValueChange={(value) => handleInputChange("dataType", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baseline">Baseline Survey</SelectItem>
                      <SelectItem value="monitoring">Regular Monitoring</SelectItem>
                      <SelectItem value="verification">Verification Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Measurements */}
          <Card>
            <CardHeader>
              <CardTitle>Field Measurements</CardTitle>
              <CardDescription>Quantitative data from field observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantCount">Plant Count *</Label>
                  <Input
                    id="plantCount"
                    type="number"
                    placeholder="5000"
                    value={formData.plantCount}
                    onChange={(e) => handleInputChange("plantCount", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaCovered">Area Covered (hectares) *</Label>
                  <Input
                    id="areaCovered"
                    type="number"
                    placeholder="50"
                    value={formData.areaCovered}
                    onChange={(e) => handleInputChange("areaCovered", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="survivalRate">Survival Rate (%) *</Label>
                  <Input
                    id="survivalRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="95"
                    value={formData.survivalRate}
                    onChange={(e) => handleInputChange("survivalRate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthScore">Health Score (1-100) *</Label>
                  <Input
                    id="healthScore"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="90"
                    value={formData.healthScore}
                    onChange={(e) => handleInputChange("healthScore", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Field Observations</Label>
                <Textarea
                  id="observations"
                  placeholder="Describe the current state of the restoration site, any challenges observed, growth patterns, wildlife activity, etc."
                  value={formData.observations}
                  onChange={(e) => handleInputChange("observations", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Field Images
              </CardTitle>
              <CardDescription>Upload photos from the restoration site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                <p className="text-xs text-muted-foreground mb-4">Supported formats: JPG, PNG, HEIC (Max 5MB each)</p>
                <Button variant="outline" type="button">
                  Choose Images
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Mock uploaded images */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * For demo purposes, images are automatically attached
              </p>
            </CardContent>
          </Card>

          {/* GPS and Environmental Data */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
              <CardDescription>Additional context about site conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weather">Weather Conditions</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weather" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunny">Sunny</SelectItem>
                      <SelectItem value="cloudy">Cloudy</SelectItem>
                      <SelectItem value="rainy">Rainy</SelectItem>
                      <SelectItem value="stormy">Stormy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tideLevel">Tide Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tide level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Tide</SelectItem>
                      <SelectItem value="mid">Mid Tide</SelectItem>
                      <SelectItem value="high">High Tide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterQuality">Water Quality</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Section */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Section</CardTitle>
              <CardDescription>Select a section on the site grid and optionally add GPS coordinates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Section grid */}
              <div>
                <Label>Site Section</Label>
                <div className="mt-2 grid grid-cols-3 gap-2 max-w-sm">
                  {(["A", "B", "C"] as const).map((row) =>
                    [1, 2, 3].map((col) => {
                      const label = `${row}${col}`
                      const selected = formData.sectionLabel === label
                      return (
                        <Button
                          key={label}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          className="h-10"
                          onClick={() => handleInputChange("sectionLabel", label)}
                          aria-pressed={selected}
                          aria-label={`Select section ${label}`}
                        >
                          {label}
                        </Button>
                      )
                    }),
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use the grid to indicate where the field data was collected within the plantation site.
                </p>
              </div>
              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    type="number"
                    inputMode="decimal"
                    step="0.000001"
                    placeholder="21.949700"
                    value={formData.lat}
                    onChange={(e) => handleInputChange("lat", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    type="number"
                    inputMode="decimal"
                    step="0.000001"
                    placeholder="88.263600"
                    value={formData.lng}
                    onChange={(e) => handleInputChange("lng", e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-sm font-medium mb-1">Map Preview</p>
                <div className="aspect-[16/9] rounded-md bg-muted flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {"Map preview placeholder (use coordinates and section grid)"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Coordinates are optional. Verifiers and NGOs will see your section selection and any provided GPS
                  point.
                </p>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Data
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
