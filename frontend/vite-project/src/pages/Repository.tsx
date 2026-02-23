import { useEffect, useState } from "react"
import { getRepository, downloadExamPDF } from "../services/examService"
import ExamCard from "../components/ExamCard"
import Loader from "../components/Loader"

export default function Repository() {
  const [materials, setMaterials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExam, setSelectedExam] = useState<any>(null)

  useEffect(() => {
    getRepository()
      .then(data => {
        // Garante que data é um array
        const exams = Array.isArray(data) ? data : (data.questions || [])
        setMaterials(exams)
      })
      .finally(() => setLoading(false))
  }, [])

  if (selectedExam) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button 
            onClick={() => setSelectedExam(null)}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          >
            ← Voltar ao Repositório
          </button>
          <button 
            onClick={() => downloadExamPDF(selectedExam._id, selectedExam.title)}
            style={{ 
              padding: "10px 20px", 
              fontSize: "16px", 
              cursor: "pointer",
              backgroundColor: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: "4px"
            }}
          >
            📥 Baixar PDF
          </button>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", color: "#000" }}>
          <h2 style={{ color: "#000" }}>{selectedExam.title}</h2>
          <p style={{ color: "#000" }}><b>Matéria:</b> {selectedExam.subject}</p>
          <p style={{ color: "#000" }}><b>Série:</b> {selectedExam.grade}</p>

          <hr style={{ margin: "20px 0" }} />

          <h3 style={{ color: "#000" }}>Questões</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {selectedExam.questions?.map((q: any, i: number) => (
              <div key={i} style={{ 
                padding: "15px", 
                backgroundColor: "#f9f9f9", 
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}>
                <p style={{ color: "#000" }}><b>{i + 1}. {q.question}</b></p>
                <ul style={{ margin: "10px 0", paddingLeft: "30px" }}>
                  {q.options?.map((o: string, idx: number) => (
                    <li key={idx} style={{ marginBottom: "8px", color: "#000" }}>
                      {o}
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: "10px", color: "#27ae60" }}>
                  <b>Resposta Correta:</b> {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#fff" }}>Repositório dos Professores</h2>

      {loading && <Loader />}

      {!loading && (
        <>
          {materials.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999" }}>Nenhuma prova salva ainda</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {materials.map((m, i) => (
                <ExamCard
                  key={i}
                  title={m.title || "Prova sem título"}
                  subject={m.subject || "N/A"}
                  grade={m.grade || "N/A"}
                  onClick={() => setSelectedExam(m)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
