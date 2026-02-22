import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#111", color: "#fff" }}>
      <Link to="/dashboard" style={{ marginRight: 20, color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/generate" style={{ marginRight: 20, color: "#fff", textDecoration: "none" }}>Gerar Prova</Link>
      <Link to="/repository" style={{ color: "#fff", textDecoration: "none" }}>Repositório</Link>
    </nav>
  )
}
