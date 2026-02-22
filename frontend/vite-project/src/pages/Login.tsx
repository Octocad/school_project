import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")

  function handleLogin() {
    if (!email) {
      alert("Por favor, insira um email")
      return
    }
    localStorage.setItem("token", "fake-token")
    localStorage.setItem("email", email)
    window.location.href = "/dashboard"
  }

  return (
    <div>
      <h2>Login Professor</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}
