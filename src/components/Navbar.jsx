"use client"
import { useTheme } from "../hooks/useTheme"

const Navbar = ({ toggleSidebar, xp, streak, updateStreak }) => {
  const { theme, setTheme } = useTheme()

  const handleGameClick = (e) => {
    e.preventDefault()
    const gameUrl = e.currentTarget.href
    updateStreak()
    window.open(gameUrl, "_blank")
  }

  return (
    <div className="navbar">
      <div className="nav-brand">
        <button id="menu-toggle" className="menu-toggle" onClick={toggleSidebar}>
          <i className="menu-icon">≡</i>
        </button>
        <div className="nav-logo">
          <img src="/placeholder.svg?height=40&width=40" alt="" className="logo-img" />
          <span className="brand-name">HomieAi</span>
        </div>
      </div>

      <div className="nav-stats">
        <div className="stat-item">
          <i className="fas fa-fire"></i>
          <span className="stat-value">{streak}</span>
          <span>Streak</span>
        </div>
        <div className="xp-container">
          <div className="xp-progress">
            <div className="xp-bar" style={{ width: `${(xp / 1000) * 100}%` }}></div>
          </div>
          <span className="xp-text">{xp}/1000 XP</span>
        </div>
      </div>

      <div className="nav-profile">
        <div className="dropdown-menu">
          <div className="dropdown-trigger">
            <i className="fas fa-gamepad"></i>
            <span>Games</span>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className="dropdown-content">
          <a href="https://www.calm.com/breathe" className="dropdown-item" onClick={handleGameClick}>
              <i className="fas fa-brain"></i>
              <span>Breathing Exercise</span>
            </a>
            <a href="https://api.razzlepuzzles.com/2048" className="dropdown-item" onClick={handleGameClick}>
              <i className="fas fa-puzzle-piece"></i>
              <span>2048 Game</span>
            </a>
            <a href="https://playtictactoe.org/" className="dropdown-item" onClick={handleGameClick}>
              <i className="fas fa-chess"></i>
              <span>Tic Tac Toe</span>
            </a>
          </div>
        </div>

        <div className="theme-selector">
          <button
            className={`theme-btn ${theme === "light" ? "active" : ""}`}
            data-theme="light"
            onClick={() => setTheme("light")}
          >
            <i className="fas fa-sun"></i>
          </button>
          <button
            className={`theme-btn ${theme === "dark" ? "active" : ""}`}
            data-theme="dark"
            onClick={() => setTheme("dark")}
          >
            <i className="fas fa-moon"></i>
          </button>
          <button
            className={`theme-btn ${theme === "purple" ? "active" : ""}`}
            data-theme="purple"
            onClick={() => setTheme("purple")}
          >
            <i className="fas fa-heart"></i>
          </button>
          <button
            className={`theme-btn ${theme === "green" ? "active" : ""}`}
            data-theme="green"
            onClick={() => setTheme("green")}
          >
            <i className="fas fa-tree"></i>
          </button>
          <button
            className={`theme-btn ${theme === "orange" ? "active" : ""}`}
            data-theme="orange"
            onClick={() => setTheme("orange")}
          >
            <i className="fas fa-fire"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar

