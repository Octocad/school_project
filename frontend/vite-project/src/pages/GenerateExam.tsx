import { useState } from "react"
import { generateExam, saveExam } from "../services/examService"
import Loader from "../components/Loader"

export default function GenerateExam() {
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [numQuestions, setNumQuestions] = useState(5)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleGenerate() {
    setLoading(true)
    setError("")
    try {
      const data = await generateExam({ subject, grade, topic, difficulty, num_questions: numQuestions })
      // Garante que questions seja um array
      const questionsArray = Array.isArray(data.questions) ? data.questions : []
      setQuestions(questionsArray)
    } catch (err: any) {
      setError("Erro ao gerar prova. Tente novamente.")
      console.error("Erro ao gerar prova:", err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    await saveExam({
      title: `Prova de ${subject}`,
      subject,
      grade,
      questions,
    })
    alert("Prova salva!")
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Gerar Prova com IA</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "30px" }}>
        <input placeholder="Matéria" onChange={e => setSubject(e.target.value)} style={{ padding: "10px", fontSize: "16px" }} />
        <input placeholder="Série" onChange={e => setGrade(e.target.value)} style={{ padding: "10px", fontSize: "16px" }} />
        <input placeholder="Tema" onChange={e => setTopic(e.target.value)} style={{ padding: "10px", fontSize: "16px" }} />

        <select onChange={e => setDifficulty(e.target.value)} style={{ padding: "10px", fontSize: "16px" }}>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="numQuestions" style={{ fontSize: "16px" }}>Número de Questões:</label>
          <input 
            id="numQuestions"
            type="number" 
            min="1" 
            max="20" 
            value={numQuestions} 
            onChange={e => setNumQuestions(parseInt(e.target.value) || 5)} 
            style={{ padding: "10px", fontSize: "16px", width: "80px" }} 
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <button onClick={handleGenerate} disabled={loading} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          {loading ? "Gerando..." : "Gerar com IA"}
        </button>
        <button onClick={handleSave} disabled={loading} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Salvar Prova
        </button>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

      {error && <p style={{ color: "#e74c3c", fontSize: "16px", marginBottom: "20px" }}>{error}</p>}

      {loading && <Loader />}

      {!loading && questions.length > 0 && (
        <>
          <h3 style={{ color: "#fff" }}>Questões Geradas ({questions.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {questions.map((q, i) => (
              <div key={i} style={{ padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "8px", color: "#000" }}>
                <p><b>{i + 1}. {q.question}</b></p>
                <ul style={{ margin: "10px 0", paddingLeft: "30px" }}>
                  {q.options?.map((o: string, idx: number) => <li key={idx} style={{ marginBottom: "8px" }}>{o}</li>)}
                </ul>
                <p><b>Resposta:</b> {q.answer}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && questions.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", marginTop: "20px" }}>Preencha os campos e clique em "Gerar com IA" para criar uma prova</p>
      )}
    </div>
  )
}
