import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ChatPage from "./components/ChatPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

