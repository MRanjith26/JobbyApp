import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import {Component} from 'react'

const profileApiStatus = {
  success: 'SUCCESS',
  inProgress: 'LOADING',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {apiStatus: '', profileDetails: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        apiStatus: profileApiStatus.success,
        profileDetails: profileData,
      })
    } else {
      this.setState({apiStatus: profileApiStatus.failure})
    }
  }

  renderSuccessProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="user-image" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  onClickRetryApi = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <>
      <button
        type="button"
        className="try-button"
        onClick={this.onClickRetryApi}
      >
        Retry
      </button>
    </>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileApiStatus.success:
        return this.renderSuccessProfileView()
      case profileApiStatus.inProgress:
        return this.renderLoaderView()
      case profileApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-container">{this.renderUserProfileStatus()}</div>
    )
  }
}
export default UserProfile
