"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Waves, Loader2, CheckCircle, Eye, EyeOff, Upload, FileText, X } from "lucide-react"
import { mockApi } from "@/lib/mockApi"

type UserRole = "NGO" | "Panchayat" | "Verifier"

// Indian states and districts data
const INDIAN_STATES_DISTRICTS = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
}

// Accreditation types for verifiers
const ACCREDITATION_TYPES = [
  "Verra VVB", "Gold Standard VVB", "UNFCCC DOE", "NABL", "CPCB", "ISO 14064", "Other"
]

// Sectoral expertise options
const SECTORAL_EXPERTISE = [
  "Marine Biology", "Forestry", "Carbon Assessment", "MRV Systems", "Environmental Science",
  "Climate Change", "Biodiversity", "Ecosystem Services", "Remote Sensing", "GIS"
]

// Designation options
const DESIGNATIONS = {
  NGO: ["President", "Secretary", "Treasurer"],
  Panchayat: ["Sarpanch", "Secretary", "Officer"],
  Verifier: ["Lead Auditor", "Senior Scientist", "MRV Specialist"]
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | "">("")
  const [formData, setFormData] = useState({
    // Basic fields
    name: "",
    contactEmail: "",
    contactPhone: "",
    state: "",
    district: "",
    officeAddress: "",
    authorizedPersonName: "",
    authorizedPersonId: "",
    designation: "",
    password: "",
    confirmPassword: "",
    
    // NGO specific
    registrationNumber: "",
    dateOfRegistration: "",
    website: "",
    mobileNumber: "",
    
    // Panchayat specific
    blockTaluk: "",
    panchayatCode: "",
    phoneNumber: "",
    
    // Verifier specific
    organizationName: "",
    country: "India",
    accreditationType: "",
    accreditationNumber: "",
    accreditingBody: "",
    organizationType: "",
    sectoralExpertise: [] as string[],
    professionalId: "",
    previousProjects: [] as File[],
    accreditationCertificate: null as File | null,
    authorizationLetter: null as File | null,
    registrationCertificate: null as File | null,
    staffCVs: null as File | null,
    
    // File uploads for all roles
    registrationCert: null as File | null,
    panCard: null as File | null,
    bankProof: null as File | null,
    panchayatId: null as File | null,
    panchayatCodeProof: null as File | null,
    govtId: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isAccredited, setIsAccredited] = useState<boolean | null>(null)
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole
    if (roleParam && ["NGO", "Panchayat", "Verifier"].includes(roleParam)) {
      setRole(roleParam)
      setStep(2)
    }
  }, [searchParams])

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleInputChange = (field: string, value: string | string[] | File | File[] | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Handle state change to update districts
    if (field === "state" && typeof value === "string") {
      const districts = INDIAN_STATES_DISTRICTS[value as keyof typeof INDIAN_STATES_DISTRICTS] || []
      setAvailableDistricts(districts)
      // Reset district when state changes
      setFormData((prev) => ({ ...prev, district: "" }))
    }
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleMultiFileUpload = (field: string, files: File[]) => {
    setFormData((prev) => ({ ...prev, [field]: files }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent, field: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0] // Take the first file
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        handleFileUpload(field, file)
      } else {
        setError('Please upload only PDF, JPG, or PNG files.')
      }
    }
  }

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sectoralExpertise: checked
        ? [...prev.sectoralExpertise, expertise]
        : prev.sectoralExpertise.filter(e => e !== expertise)
    }))
  }

  // File upload component
  const FileUploadComponent = ({ 
    field, 
    label, 
    required = false, 
    accept = ".pdf,.jpg,.jpeg,.png" 
  }: { 
    field: string; 
    label: string; 
    required?: boolean; 
    accept?: string;
  }) => {
    const file = formData[field as keyof typeof formData] as File | null
    
    return (
      <div className="space-y-2">
        <Label>
          {label} {required && "*"}
        </Label>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, field)}
          onClick={() => document.getElementById(`${field}-input`)?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-600 mt-2">
            {file ? "Click to change file or drag and drop" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF, JPG, PNG files only
          </p>
          <input
            type="file"
            id={`${field}-input`}
            accept={accept}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null
              if (selectedFile) {
                if (selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf') {
                  handleFileUpload(field, selectedFile)
                  setError("") // Clear any previous errors
                } else {
                  setError('Please upload only PDF, JPG, or PNG files.')
                }
              }
            }}
            className="hidden"
          />
        </div>
        {file && (
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{file.name}</span>
              <span className="text-xs text-green-600">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleFileUpload(field, null)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    )
  }

  const validateForm = () => {
    // Basic validation
    if (!formData.name || !formData.contactEmail || !formData.contactPhone) {
      setError("Please fill in all required fields.")
      return false
    }

    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return false
    }

    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      setError("Password must include at least one number and one special character.")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return false
    }

    // Role-specific validation
    if (role === "NGO") {
      if (!formData.registrationNumber || !formData.dateOfRegistration) {
        setError("Please fill in NGO registration details.")
        return false
      }
      if (!formData.registrationCert) {
        setError("Please upload the NGO registration certificate.")
        return false
      }
      if (!formData.panCard) {
        setError("Please upload the PAN card of the NGO.")
        return false
      }
    }

    if (role === "Panchayat") {
      if (!formData.panchayatCode) {
        setError("Please provide the official Panchayat Code (LGD Code).")
        return false
      }
      if (!formData.panchayatId) {
        setError("Please upload the Panchayat ID or Gazette Notification.")
        return false
      }
      if (!formData.panchayatCodeProof) {
        setError("Please upload the Panchayat Code Proof.")
        return false
      }
    }

    if (role === "Verifier") {
      if (isAccredited === null) {
        setError("Please specify if your organization is accredited.")
        return false
      }
      
      if (formData.sectoralExpertise.length === 0) {
        setError("Please select at least one area of sectoral expertise.")
        return false
      }

      if (!formData.authorizationLetter) {
        setError("Please upload the Letter of Authorization from Organization.")
        return false
      }

      if (isAccredited === true && !formData.accreditationCertificate) {
        setError("Please upload the Accreditation Certificate.")
        return false
      }

      if (isAccredited === false) {
        if (!formData.registrationCertificate) {
          setError("Please upload the Organization Registration Certificate.")
          return false
        }
        if (!formData.staffCVs) {
          setError("Please upload Staff CVs or Project Reference Letters.")
          return false
        }
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return

    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      const registrationData = {
        role,
        name: formData.name,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        documents: [], // Mock documents array
        jurisdiction: formData.state + ", " + formData.district, // Combine state and district
        password: formData.password,
        // Role-specific data
        ...(role === "NGO" && {
          registrationNumber: formData.registrationNumber,
          dateOfRegistration: formData.dateOfRegistration,
          website: formData.website,
          mobileNumber: formData.mobileNumber,
        }),
        ...(role === "Panchayat" && {
          blockTaluk: formData.blockTaluk,
          panchayatCode: formData.panchayatCode,
          phoneNumber: formData.phoneNumber,
        }),
        ...(role === "Verifier" && {
          organizationName: formData.organizationName,
          country: formData.country,
          isAccredited,
          accreditationType: formData.accreditationType,
          accreditationNumber: formData.accreditationNumber,
          accreditingBody: formData.accreditingBody,
          organizationType: formData.organizationType,
          sectoralExpertise: formData.sectoralExpertise,
          professionalId: formData.professionalId,
        }),
      }

      await mockApi.registerUser(registrationData)
      setSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            <CardDescription>Your account is pending admin approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Thank you for registering as a <strong>{role}</strong>. Your account will be reviewed by the NCCR Admin
              team and you'll receive an email notification once approved. 
              {role === "NGO" && " Upon approval, you'll receive a DID and Solana wallet binding."}
              {role === "Panchayat" && " Upon approval, you'll receive a DID and Solana wallet binding after verification of your Panchayat Code."}
              {role === "Verifier" && " Upon approval, you'll receive a DID and Solana wallet binding. Accredited agencies can immediately submit verification reports, while normal agencies may require secondary approval."}
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-4 sm:py-8 mobile-padding">
      <Card className="w-full max-w-2xl mobile-card-shadow">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
              <Waves className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl">Join Blue Carbon Registry</CardTitle>
          <CardDescription className="text-sm sm:text-base">{step === 1 ? "Choose your role to get started" : `Register as ${role}`}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 sm:p-6 flex flex-col items-center space-y-2 bg-transparent mobile-card-shadow"
                  onClick={() => handleRoleSelect("NGO")}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm sm:text-base">NGO</span>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm sm:text-base">NGO</div>
                    <div className="text-xs text-muted-foreground">Environmental Organization</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 sm:p-6 flex flex-col items-center space-y-2 bg-transparent mobile-card-shadow"
                  onClick={() => handleRoleSelect("Panchayat")}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">GP</span>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm sm:text-base">Panchayat</div>
                    <div className="text-xs text-muted-foreground">Local Government</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 sm:p-6 flex flex-col items-center space-y-2 bg-transparent mobile-card-shadow"
                  onClick={() => handleRoleSelect("Verifier")}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm sm:text-base">VF</span>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm sm:text-base">Verifier</div>
                    <div className="text-xs text-muted-foreground">Independent Expert</div>
                  </div>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {role === "NGO" ? "NGO Name" : role === "Panchayat" ? "Panchayat Name" : "Verifier Organization Name"} *
                      </Label>
                      <Input
                        id="name"
                        placeholder={`Enter ${role === "NGO" ? "NGO" : role} name`}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Official Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter official email address"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {role === "NGO" ? "Mobile Number" : role === "Panchayat" ? "Phone Number" : "Phone Number"} *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(INDIAN_STATES_DISTRICTS).map((state: string) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District *</Label>
                      <Select 
                        value={formData.district} 
                        onValueChange={(value) => handleInputChange("district", value)}
                        disabled={!formData.state}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={formData.state ? "Select district" : "Select state first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.state && (
                        <p className="text-xs text-muted-foreground">
                          {availableDistricts.length} districts available in {formData.state}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="officeAddress">Office Address *</Label>
                      <Textarea
                        id="officeAddress"
                        placeholder="Enter complete office address"
                        value={formData.officeAddress}
                        onChange={(e) => handleInputChange("officeAddress", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="authorizedPersonName">Authorized Person Name *</Label>
                      <Input
                        id="authorizedPersonName"
                        placeholder="Enter authorized person name"
                        value={formData.authorizedPersonName}
                        onChange={(e) => handleInputChange("authorizedPersonName", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Select value={formData.designation} onValueChange={(value) => handleInputChange("designation", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent>
                          {role && role in DESIGNATIONS && DESIGNATIONS[role as keyof typeof DESIGNATIONS].map((designation: string) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role-specific Information */}
              {role === "NGO" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">NGO Registration Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="registrationNumber">NGO Registration Number / Darpan ID *</Label>
                        <Input
                          id="registrationNumber"
                          placeholder="Enter registration number"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfRegistration">Date of Registration *</Label>
                        <Input
                          id="dateOfRegistration"
                          type="date"
                          value={formData.dateOfRegistration}
                          onChange={(e) => handleInputChange("dateOfRegistration", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Official Website (optional)</Label>
                        <Input
                          id="website"
                          placeholder="https://your-ngo.org"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="authorizedPersonId">Authorized Person Aadhaar / PAN *</Label>
                        <Input
                          id="authorizedPersonId"
                          placeholder="Enter Aadhaar or PAN number"
                          value={formData.authorizedPersonId}
                          onChange={(e) => handleInputChange("authorizedPersonId", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {role === "Panchayat" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Panchayat Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="blockTaluk">Block / Taluk *</Label>
                        <Input
                          id="blockTaluk"
                          placeholder="Enter block or taluk name"
                          value={formData.blockTaluk}
                          onChange={(e) => handleInputChange("blockTaluk", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="panchayatCode">Official Panchayat Code (LGD Code) *</Label>
                        <Input
                          id="panchayatCode"
                          placeholder="Enter official LGD code"
                          value={formData.panchayatCode}
                          onChange={(e) => handleInputChange("panchayatCode", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="authorizedPersonId">Authorized Person Govt ID / Aadhaar *</Label>
                        <Input
                          id="authorizedPersonId"
                          placeholder="Enter government ID or Aadhaar"
                          value={formData.authorizedPersonId}
                          onChange={(e) => handleInputChange("authorizedPersonId", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {role === "Verifier" && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Accreditation & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <Label>Is your organization accredited? *</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="accredited-yes"
                              checked={isAccredited === true}
                              onCheckedChange={() => setIsAccredited(true)}
                            />
                            <Label htmlFor="accredited-yes">Yes, we are accredited</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="accredited-no"
                              checked={isAccredited === false}
                              onCheckedChange={() => setIsAccredited(false)}
                            />
                            <Label htmlFor="accredited-no">No, we are not accredited</Label>
                          </div>
                        </div>
                      </div>

                      {isAccredited === true && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="accreditationType">Accreditation Type *</Label>
                            <Select value={formData.accreditationType} onValueChange={(value) => handleInputChange("accreditationType", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select accreditation type" />
                              </SelectTrigger>
                              <SelectContent>
                                {ACCREDITATION_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accreditationNumber">Accreditation / License Number *</Label>
                            <Input
                              id="accreditationNumber"
                              placeholder="Enter accreditation number"
                              value={formData.accreditationNumber}
                              onChange={(e) => handleInputChange("accreditationNumber", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accreditingBody">Accrediting Body *</Label>
                            <Select value={formData.accreditingBody} onValueChange={(value) => handleInputChange("accreditingBody", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select accrediting body" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Verra">Verra</SelectItem>
                                <SelectItem value="NABL">NABL</SelectItem>
                                <SelectItem value="UNFCCC">UNFCCC</SelectItem>
                                <SelectItem value="CPCB">CPCB</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="professionalId">Professional ID / Empanelment ID</Label>
                            <Input
                              id="professionalId"
                              placeholder="Enter professional ID"
                              value={formData.professionalId}
                              onChange={(e) => handleInputChange("professionalId", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {isAccredited === false && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="organizationType">Organization Type *</Label>
                            <Select value={formData.organizationType} onValueChange={(value) => handleInputChange("organizationType", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Company">Company</SelectItem>
                                <SelectItem value="NGO">NGO</SelectItem>
                                <SelectItem value="Consultancy">Consultancy</SelectItem>
                                <SelectItem value="LLP">LLP</SelectItem>
                                <SelectItem value="Partnership">Partnership</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Sectoral Expertise / Domain *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {SECTORAL_EXPERTISE.map((expertise) => (
                            <div key={expertise} className="flex items-center space-x-2">
                              <Checkbox
                                id={expertise}
                                checked={formData.sectoralExpertise.includes(expertise)}
                                onCheckedChange={(checked) => handleExpertiseChange(expertise, checked as boolean)}
                              />
                              <Label htmlFor={expertise} className="text-sm">{expertise}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* File Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Upload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {role === "NGO" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FileUploadComponent
                        field="registrationCert"
                        label="Upload Registration Certificate"
                        required={true}
                      />
                      <FileUploadComponent
                        field="panCard"
                        label="Upload PAN Card of NGO"
                        required={true}
                      />
                      <FileUploadComponent
                        field="bankProof"
                        label="Upload Bank Proof"
                        required={false}
                      />
                    </div>
                  )}

                  {role === "Panchayat" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FileUploadComponent
                        field="panchayatId"
                        label="Upload Panchayat ID / Gazette Notification"
                        required={true}
                      />
                      <FileUploadComponent
                        field="panchayatCodeProof"
                        label="Upload Panchayat Code Proof"
                        required={true}
                      />
                    </div>
                  )}

                  {role === "Verifier" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {isAccredited === true && (
                          <FileUploadComponent
                            field="accreditationCertificate"
                            label="Upload Accreditation Certificate"
                            required={true}
                          />
                        )}
                        
                        <FileUploadComponent
                          field="authorizationLetter"
                          label="Upload Letter of Authorization from Organization"
                          required={true}
                        />

                        {isAccredited === false && (
                          <>
                            <FileUploadComponent
                              field="registrationCertificate"
                              label="Upload Organization Registration Certificate"
                              required={true}
                            />
                            <FileUploadComponent
                              field="staffCVs"
                              label="Upload Staff CVs / Project Reference Letters"
                              required={true}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Password Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">Minimum 8 characters, must include number + special character</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          aria-label={showConfirm ? "Hide password" : "Show password"}
                          onClick={() => setShowConfirm((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="sm:w-auto">
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
