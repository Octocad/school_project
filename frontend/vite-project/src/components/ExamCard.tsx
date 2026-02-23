interface ExamCardProps {
  title: string
  subject: string
  grade: string
  onClick?: () => void
}

export default function ExamCard({ title, subject, grade, onClick }: ExamCardProps) {
  return (
    <div 
      style={{ 
        border: "1px solid #ddd", 
        padding: 16, 
        marginBottom: 10,
        borderRadius: "8px",
        cursor: onClick ? "pointer" : "default",
        backgroundColor: onClick ? "#f9f9f9" : "#fff",
        transition: "all 0.3s ease"
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)"
          e.currentTarget.style.backgroundColor = "#f0f0f0"
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = "none"
          e.currentTarget.style.backgroundColor = "#f9f9f9"
        }
      }}
    >
      <h3 style={{ color: "#000" }}>{title}</h3>
      <p style={{ color: "#000" }}><b>Matéria:</b> {subject}</p>
      <p style={{ color: "#000" }}><b>Série:</b> {grade}</p>
    </div>
  )
}
