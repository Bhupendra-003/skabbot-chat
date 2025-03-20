"use client"

const Sidebar = ({ active, toggleSidebar }) => {
  return (
    <div className={`sidebar ${active ? "active" : ""}`}>
      <div className="sidebar-nav">
        <i className="fas fa-times close-icon" onClick={toggleSidebar}></i>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <a href="#" className="sidebar-item">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="sidebar-item">
            <i className="fas fa-gamepad"></i>
            <span>Games</span>
          </a>
          <a href="#" className="sidebar-item">
            <i className="fas fa-chart-line"></i>
            <span>Progress</span>
          </a>
          <a href="#" className="sidebar-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </a>
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

