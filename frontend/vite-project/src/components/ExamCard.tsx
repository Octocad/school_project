interface ExamCardProps {
  title: string
  subject: string
  grade: string
}

export default function ExamCard({ title, subject, grade }: ExamCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 10 }}>
      <h3>{title}</h3>
      <p><b>Matéria:</b> {subject}</p>
      <p><b>Série:</b> {grade}</p>
    </div>
  )
}
