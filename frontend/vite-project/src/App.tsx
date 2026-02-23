import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import GenerateExam from "./pages/GenerateExam"
import Repository from "./pages/Repository"

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/"

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<GenerateExam />} />
          <Route path="/repository" element={<Repository />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}