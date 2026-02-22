import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import GenerateExam from "./pages/GenerateExam"
import Repository from "./pages/Repository"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<GenerateExam />} />
          <Route path="/repository" element={<Repository />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}