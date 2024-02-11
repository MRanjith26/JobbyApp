import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="desk-nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="desk-logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
        <ul className="mobile-nav-menu">
          <Link to="/" className="nav-link">
            <li>
              <IoMdHome className="nav-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsBriefcase className="nav-icon" />
            </li>
          </Link>
          <button
            className="mobile-logout-button"
            type="button"
            aria-label="logout"
            onClick={onLogout}
          >
            <FiLogOut className="nav-icon" />
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
