import './index.css'

const NotFound = () => (
  <div className="none-container">
    <div className="none-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="none-img"
      />
      <h1 className="none-title">Page Not Found</h1>
      <p className="none-text">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
