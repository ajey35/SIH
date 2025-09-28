"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { Shield, Users, TreePine, Award, ArrowRight, CheckCircle, Globe, Leaf, Zap, Sparkles } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary/15 rounded-full blur-md animate-bounce delay-3000"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 relative">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg animate-ping"></div>
                <div className="relative group-hover:scale-110 transition-all duration-500">
                  <Logo size="xl" showText={false} className="drop-shadow-2xl" />
                  <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-balance leading-tight animate-fade-in">
              Empowering Coastal Communities,{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                Restoring Blue Carbon
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 text-pretty max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
              India's first blockchain-based platform for transparent mangrove restoration, carbon credit verification,
              and community-driven coastal conservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-delay-2">
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-r from-primary to-blue-600" asChild>
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold border-2 hover:bg-primary/10 transition-all duration-500 hover:scale-105 backdrop-blur-sm" asChild>
                <Link href="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Platform Impact
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real-time metrics showcasing our collective impact on coastal restoration
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group animate-fade-in-delay">
              <StatCard
                title="Active Projects"
                value="24"
                description="Restoration projects across India"
                icon={TreePine}
                className="group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 hover:border-primary/20 border-2"
              />
            </div>
            <div className="group animate-fade-in-delay" style={{animationDelay: '0.1s'}}>
              <StatCard
                title="Carbon Credits Issued"
                value="1,250"
                description="Verified blue carbon credits"
                icon={Award}
                className="group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 hover:border-primary/20 border-2"
              />
            </div>
            <div className="group animate-fade-in-delay" style={{animationDelay: '0.2s'}}>
              <StatCard
                title="Registered NGOs"
                value="18"
                description="Verified environmental organizations"
                icon={Users}
                className="group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 hover:border-primary/20 border-2"
              />
            </div>
            <div className="group animate-fade-in-delay" style={{animationDelay: '0.3s'}}>
              <StatCard 
                title="Hectares Restored" 
                value="850" 
                description="Mangrove and coastal ecosystems" 
                icon={Leaf}
                className="group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 hover:border-primary/20 border-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Our transparent, blockchain-verified process ensures accountability and trust in every restoration
              project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center animate-fade-in-delay">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-primary/20">
                  <Users className="h-10 w-10 text-primary group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Register</h3>
              <p className="text-muted-foreground leading-relaxed">
                NGOs, Panchayats, and Verifiers register and get verified by NCCR Admin
              </p>
            </div>

            <div className="group text-center animate-fade-in-delay" style={{animationDelay: '0.1s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-primary/20">
                  <Shield className="h-10 w-10 text-primary group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}>
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Approval</h3>
              <p className="text-muted-foreground leading-relaxed">
                Admin reviews and approves stakeholder registrations for platform access
              </p>
            </div>

            <div className="group text-center animate-fade-in-delay" style={{animationDelay: '0.2s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-primary/20">
                  <TreePine className="h-10 w-10 text-primary group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Proposal</h3>
              <p className="text-muted-foreground leading-relaxed">
                NGOs submit restoration proposals with Panchayat collaboration
              </p>
            </div>

            <div className="group text-center animate-fade-in-delay" style={{animationDelay: '0.3s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-primary/20">
                  <CheckCircle className="h-10 w-10 text-primary group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg animate-pulse" style={{animationDelay: '1.5s'}}>
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Independent verifiers validate progress and issue carbon credits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-24 bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-36 h-36 bg-green-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Join Our Platform
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Choose your role and start contributing to coastal restoration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-green-500/20 animate-fade-in-delay backdrop-blur-sm bg-card/80">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Users className="h-8 w-8 text-green-600 group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300">NGO</CardTitle>
                <CardDescription className="text-base leading-relaxed">Environmental organizations leading restoration projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 mb-6">
                  <li className="flex items-center group-hover:text-green-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Submit project proposals
                  </li>
                  <li className="flex items-center group-hover:text-green-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Track restoration progress
                  </li>
                  <li className="flex items-center group-hover:text-green-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Earn carbon credits
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold group-hover:bg-green-600 group-hover:text-white transition-all duration-500" variant="outline" asChild>
                  <Link href="/register?role=NGO">Register as NGO</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-blue-500/20 animate-fade-in-delay backdrop-blur-sm bg-card/80" style={{animationDelay: '0.1s'}}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Globe className="h-8 w-8 text-blue-600 group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">Panchayat</CardTitle>
                <CardDescription className="text-base leading-relaxed">Local government bodies supporting community projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 mb-6">
                  <li className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Collaborate on projects
                  </li>
                  <li className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Upload field data
                  </li>
                  <li className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Monitor local impact
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all duration-500" variant="outline" asChild>
                  <Link href="/register?role=Panchayat">Register as Panchayat</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-purple-500/20 animate-fade-in-delay backdrop-blur-sm bg-card/80" style={{animationDelay: '0.2s'}}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Shield className="h-8 w-8 text-purple-600 group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-300">Verifier</CardTitle>
                <CardDescription className="text-base leading-relaxed">Independent experts ensuring project authenticity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 mb-6">
                  <li className="flex items-center group-hover:text-purple-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Review project data
                  </li>
                  <li className="flex items-center group-hover:text-purple-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Validate carbon credits
                  </li>
                  <li className="flex items-center group-hover:text-purple-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Ensure compliance
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold group-hover:bg-purple-600 group-hover:text-white transition-all duration-500" variant="outline" asChild>
                  <Link href="/register?role=Verifier">Register as Verifier</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-orange-500/20 animate-fade-in-delay backdrop-blur-sm bg-card/80" style={{animationDelay: '0.3s'}}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Award className="h-8 w-8 text-orange-600 group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-300">NCCR Admin</CardTitle>
                <CardDescription className="text-base leading-relaxed">National authority overseeing the registry system</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3 mb-6">
                  <li className="flex items-center group-hover:text-orange-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Approve stakeholders
                  </li>
                  <li className="flex items-center group-hover:text-orange-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Oversee registry
                  </li>
                  <li className="flex items-center group-hover:text-orange-600 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 group-hover:animate-pulse" />
                    Issue final credits
                  </li>
                </ul>
                <Button className="w-full h-12 font-semibold opacity-50 cursor-not-allowed" variant="outline" disabled>
                  Admin Access Only
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient">
                Ready to Make a Difference?
              </h2>
              <p className="text-muted-foreground text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                Join India's leading platform for transparent coastal restoration and help build a sustainable future for
                our blue carbon ecosystems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-r from-primary to-blue-600" asChild>
                <Link href="/register">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-2 hover:bg-primary/10 transition-all duration-500 hover:scale-105 backdrop-blur-sm" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
