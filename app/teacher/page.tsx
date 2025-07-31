"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Users, Settings, CheckCircle, FileSearch, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeacherDashboard() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      filename: string
      subject: string
      questionsCount: number
      usingAI: boolean
      title: string
      extractedTextLength: number
    }>
  >([])
  const { toast } = useToast()

  const handleFileUpload = async (formData: FormData) => {
    setUploading(true)
    try {
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedFiles((prev) => [
          ...prev,
          {
            filename: result.filename,
            subject: result.detectedSubject || "General",
            questionsCount: result.questions.length,
            usingAI: !result.usingMockData,
            title: result.title,
            extractedTextLength: result.extractedTextLength || 0,
          },
        ])

        if (result.usingMockData) {
          if (result.extractedTextLength > 50) {
            toast({
              title: "Questions Generated from PDF Content!",
              description: `Analyzed ${result.extractedTextLength} characters from your PDF and created ${result.questions.length} questions based on the actual content.`,
            })
          } else {
            toast({
              title: "PDF Processed!",
              description: `Created ${result.questions.length} questions. For better results, ensure your PDF has extractable text or add an OpenAI API key.`,
              variant: "default",
            })
          }
        } else {
          toast({
            title: "AI Analysis Complete!",
            description: "PDF analyzed by AI and questions generated from the document content.",
          })
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Generate Test from PDF Content
                </CardTitle>
                <CardDescription>
                  Upload PDF files to generate questions based on the actual content of your document. The system will
                  analyze the PDF and create relevant questions from the material.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleFileUpload} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Test Title *</Label>
                    <Input id="title" name="title" placeholder="e.g., Chapter 5: Photosynthesis Quiz" required />
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Additional context about the test..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pdf">PDF File *</Label>
                    <Input id="pdf" name="pdf" type="file" accept="application/pdf" required />
                    <p className="text-sm text-gray-500 mt-1">
                      📄 Questions will be generated from the actual content of your PDF
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="questions">Number of Questions</Label>
                    <Input id="questions" name="questions" type="number" min="5" max="50" defaultValue="10" />
                  </div>

                  <Button type="submit" disabled={uploading} className="w-full">
                    {uploading ? "Analyzing PDF Content..." : "Generate Test from PDF"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Generated Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{file.title}</span>
                            {file.usingAI ? (
                              <CheckCircle className="h-4 w-4 text-green-600" title="AI Analyzed PDF Content" />
                            ) : file.extractedTextLength > 50 ? (
                              <FileSearch className="h-4 w-4 text-blue-600" title="Generated from PDF Text" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-orange-600" title="Limited Text Extraction" />
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {file.subject} • {file.questionsCount} questions • {file.filename}
                            {file.extractedTextLength > 0 && <span> • {file.extractedTextLength} chars analyzed</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Test Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Tests</span>
                  <span className="font-semibold">{uploadedFiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">AI Generated</span>
                  <span className="font-semibold">{uploadedFiles.filter((f) => f.usingAI).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Content-Based</span>
                  <span className="font-semibold">
                    {uploadedFiles.filter((f) => !f.usingAI && f.extractedTextLength > 50).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSearch className="h-5 w-5" />
                  Content Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>AI PDF Analysis (with API key)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-blue-600" />
                  <span>Text Extraction & Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>Limited Extraction (fallback)</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Questions are generated from your PDF content. Better text extraction leads to more relevant
                  questions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 PDF Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Use PDFs with selectable text</p>
                <p>• Avoid image-only PDFs</p>
                <p>• Clear, readable content works best</p>
                <p>• Educational materials preferred</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  View All Tests
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Student Results
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
