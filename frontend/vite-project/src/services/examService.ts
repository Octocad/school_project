import { api } from "../api/apiClient"

export async function generateExam(data: {
  subject: string
  grade: string
  topic: string
  difficulty: string
  num_questions?: number
}) {
  const res = await api.post("/ai/generate", data)
  // Garante que sempre retorna {questions: []}
  if (!res.data.questions) {
    res.data.questions = []
  }
  return res.data
}

export async function saveExam(exam: any) {
  return api.post("/exams", exam)
}

export async function getExams() {
  const res = await api.get("/exams")
  return res.data
}

export async function getRepository() {
  const res = await api.get("/repository")
  return res.data
}
export async function downloadExamPDF(examId: string, examTitle: string) {
  try {
    const res = await api.get(`/exams/${examId}/download-pdf`, {
      responseType: "blob"
    })
    
    // Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `prova_${examTitle}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error downloading PDF:", error)
  }
}