"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, User, GraduationCap } from "lucide-react"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true)
    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const userType = formData.get("userType")
    if (userType === "teacher") {
      window.location.href = "/teacher"
    } else {
      window.location.href = "/student"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">PrepApp</h1>
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join our learning platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form action={handleSignup} className="space-y-4">
                <input type="hidden" name="userType" value="student" />
                <div>
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input id="student-name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="student-email">Email</Label>
                  <Input id="student-email" type="email" placeholder="student@example.com" required />
                </div>
                <div>
                  <Label htmlFor="student-password">Password</Label>
                  <Input id="student-password" type="password" required />
                </div>
                <div>
                  <Label htmlFor="student-grade">Grade Level</Label>
                  <Input id="student-grade" placeholder="e.g., 10th Grade" />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign up as Student"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="teacher">
              <form action={handleSignup} className="space-y-4">
                <input type="hidden" name="userType" value="teacher" />
                <div>
                  <Label htmlFor="teacher-name">Full Name</Label>
                  <Input id="teacher-name" placeholder="Dr. Jane Smith" required />
                </div>
                <div>
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input id="teacher-email" type="email" placeholder="teacher@example.com" required />
                </div>
                <div>
                  <Label htmlFor="teacher-password">Password</Label>
                  <Input id="teacher-password" type="password" required />
                </div>
                <div>
                  <Label htmlFor="teacher-subject">Subject</Label>
                  <Input id="teacher-subject" placeholder="e.g., Biology, Mathematics" />
                </div>
                <div>
                  <Label htmlFor="teacher-school">School/Institution</Label>
                  <Input id="teacher-school" placeholder="Your school name" />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign up as Teacher"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
