import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleLogin() {
    setError("")

    if (!email) {
      setError("Por favor, insira um email")
      return
    }

    // Validação mockada - apenas "professorTeste" é aceito
    if (email.toLowerCase() !== "professorteste") {
      setError("Acesso negado. Use o email 'professorTeste'")
      return
    }

    localStorage.setItem("token", "fake-token")
    localStorage.setItem("email", email)
    navigate("/dashboard")
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#2a2a2a",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#61dafb", marginBottom: "10px" }}>School_Project</h1>
        <p style={{ color: "#999", marginBottom: "30px" }}>Sistema de Geração de Provas com IA</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Email do Professor"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyPress={e => e.key === "Enter" && handleLogin()}
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #444",
              borderRadius: "6px",
              backgroundColor: "#333",
              color: "#fff",
              outline: "none"
            }}
          />

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "14px", margin: "0" }}>
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            style={{
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#61dafb",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#4dd0e1"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#61dafb"}
          >
            Entrar
          </button>
        </div>

        <div style={{
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "1px solid #444",
          fontSize: "12px",
          color: "#666"
        }}>
          <p style={{ margin: "5px 0" }}>
            <strong>Demo:</strong> Use o email
          </p>
          <p style={{ margin: "5px 0", color: "#61dafb", fontSize: "14px" }}>
            professorTeste
          </p>
        </div>
      </div>
    </div>
  )
}
