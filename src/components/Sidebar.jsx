"use client"
import { useState } from "react"
import { useTheme } from "../hooks/useTheme"

const Sidebar = ({ active, toggleSidebar }) => {
  const { theme, setTheme } = useTheme()
  const [themeTrigger, setThemeTrigger] = useState(false)
  const handleThemeClick = () =>{
    setThemeTrigger((prev) => !prev)
    console.log(themeTrigger)
  }
  return (

    <div className={`sidebar ${active ? "active" : ""}`}>
      <div className="sidebar-nav">
        <h2>SKABOT</h2>
        <i className="fas fa-times close-icon" onClick={toggleSidebar}></i>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <a href="#" className="sidebar-item">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="sidebar-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </a>

          <div className="dropdown-menu">
            <div className="sidebar-item" onClick={handleThemeClick}>
              <i className="fas fa-palette"></i>
              <span>Theme</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div style={themeTrigger?{display: "flex"}:{display: "none"}} className="sidebar-dropdown-content ">
              <button
                className={`${theme === "light" ? "active" : ""}`}
                data-theme="light"
                onClick={() => setTheme("light")}
              >
                <i className="fas fa-sun"></i>
                <p>Light</p>
              </button>
              <button
                className={`${theme === "dark" ? "active" : ""}`}
                data-theme="dark"
                onClick={() => setTheme("dark")}
              >
                <i className="fas fa-moon"></i>
                <p>Dark</p>
              </button>
              <button
                className={`${theme === "purple" ? "active" : ""}`}
                data-theme="purple"
                onClick={() => setTheme("purple")}
              >
                <i className="fas fa-heart"></i>
                <p>Purple</p>
              </button>
              <button
                className={`${theme === "green" ? "active" : ""}`}
                data-theme="green"
                onClick={() => setTheme("green")}
              >
                <i className="fas fa-tree"></i>
                <p>Green</p>
              </button>
              <button
                className={`${theme === "orange" ? "active" : ""}`}
                data-theme="orange"
                onClick={() => setTheme("orange")}
              >
                <i className="fas fa-fire"></i>
                <p>Orange</p>
              </button>
            </div>
          </div>

        </div>
        <div className="sidebar-footer">
          <a href="#" className="sidebar-item">
            <i className="fas fa-question-circle"></i>
            <span>Help</span>
          </a>
          <a href="#" className="sidebar-item">
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

