import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Upload, Users, Trophy } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">PrepApp</h1>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Smart Learning Platform</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Teachers upload PDFs, AI generates intelligent tests, and students learn effectively. The future of education
          is here.
        </p>
        <div className="space-x-4">
          <Link href="/teacher">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              I'm a Teacher
            </Button>
          </Link>
          <Link href="/student">
            <Button size="lg" variant="outline">
              I'm a Student
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Upload Content</CardTitle>
              <CardDescription>Teachers upload PDF materials and study guides</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Simply drag and drop your PDF files. Our AI will analyze the content and prepare it for test generation.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>AI-Generated Tests</CardTitle>
              <CardDescription>Smart questions created from your content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our advanced AI analyzes PDFs and generates relevant, challenging questions tailored to the material.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>Monitor student performance and learning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detailed analytics help teachers understand student progress and identify areas for improvement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PrepApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
