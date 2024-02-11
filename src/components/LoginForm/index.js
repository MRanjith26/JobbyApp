import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSuccessfulLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onLoginSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onAddUsername = event => {
    this.setState({username: event.target.value})
  }

  onAddPassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          className="form-input"
          onChange={this.onAddPassword}
          value={password}
          placeholder="Password"
          id="password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          className="form-input"
          onChange={this.onAddUsername}
          placeholder="Username"
          autoComplete="off"
          value={username}
          id="username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="form-image"
          />
          <form className="login-form" onSubmit={this.onLoginSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="form-button">
              Login
            </button>
            {showSubmitError && <p className="error-text">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
