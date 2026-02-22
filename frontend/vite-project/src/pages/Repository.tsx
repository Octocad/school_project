import { useEffect, useState } from "react"
import { getRepository } from "../services/examService"
import ExamCard from "../components/ExamCard"

export default function Repository() {
  const [materials, setMaterials] = useState<any[]>([])

  useEffect(() => {
    getRepository().then(setMaterials)
  }, [])

  return (
    <div>
      <h2>Repositório de Professores</h2>

      {materials.map((m, i) => (
        <ExamCard
          key={i}
          title={m.title}
          subject={m.subject}
          grade={m.grade}
        />
      ))}
    </div>
  )
}
