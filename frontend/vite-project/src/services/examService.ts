import { api } from "../api/apiClient"

export async function generateExam(data: {
  subject: string
  grade: string
  topic: string
  difficulty: string
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
