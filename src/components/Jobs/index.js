import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import {Component} from 'react'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'
import JobFilters from '../JobFilters'

const JobsDataApiStatus = {
  success: 'SUCCESS',
  inProgress: 'LOADING',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: '',
    jobDetailsList: [],
    searchText: '',
    activeEmploymentIdList: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {activeEmploymentIdList, activeSalaryRangeId, searchText} = this.state
    const activeEmploymentIds = activeEmploymentIdList.join(',')

    this.setState({apiStatus: JobsDataApiStatus.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIds}&minimum_package=${activeSalaryRangeId}&search=${searchText}`
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
      const UpdatedJobData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
      }))
      this.setState({
        jobDetailsList: UpdatedJobData,
        apiStatus: JobsDataApiStatus.success,
      })
    } else {
      this.setState({apiStatus: JobsDataApiStatus.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  changeEmploymentType = employmentId => {
    const {activeEmploymentIdList} = this.state
    const checkId = activeEmploymentIdList.includes(employmentId)

    if (checkId === false) {
      this.setState(
        prevState => ({
          activeEmploymentIdList: [
            ...prevState.activeEmploymentIdList,
            employmentId,
          ],
        }),
        this.getJobsDetails,
      )
    } else {
      const filteredList = activeEmploymentIdList.filter(
        employment => employment !== employmentId,
      )
      this.setState({activeEmploymentIdList: filteredList}, this.getJobsDetails)
    }
  }

  changeSalaryRange = salaryId => {
    this.setState({activeSalaryRangeId: salaryId}, this.getJobsDetails)
  }

  renderSuccessView = () => {
    const {jobDetailsList} = this.state
    const ShowJobsList = jobDetailsList.length > 0

    return ShowJobsList ? this.renderJobsListView() : this.renderNoJobsView()
  }

  // TODO: No Jobs Found View (on API Success View)
  renderNoJobsView = () => (
    <div className="no-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-image"
      />
      <h1 className="no-title">No Jobs Found</h1>
      <p className="no-text">We could not find any jobs. Try other filters.</p>
    </div>
  )

  // TODO: Jobs View (on API Success View)
  renderJobsListView = () => {
    const {jobDetailsList} = this.state
    return (
      <ul className="jobs-container">
        {jobDetailsList.map(eachJobItem => (
          <JobItem key={eachJobItem.id} jobDetails={eachJobItem} />
        ))}
      </ul>
    )
  }

  // TODO: Loader View
  renderLoaderView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobsDetails()
  }

  onClickSearch = () => {
    this.getJobsDetails()
  }

  // TODO: Failure View
  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="fail-title">Oops! Something Went Wrong</h1>
      <p className="fail-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="try-button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsApiList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case JobsDataApiStatus.success:
        return this.renderSuccessView()
      case JobsDataApiStatus.inProgress:
        return this.renderLoaderView()
      case JobsDataApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchText} = this.state
    return (
      <>
        <Header />

        <div className="jobs-section">
          <div className="profile-filter-container">
            <div className="mobile-search-container">
              <input
                type="search"
                onChange={this.onSearchInput}
                className="mobile-search-input"
                placeholder="Search"
                value={searchText}
              />
              <button
                className="search-button"
                aria-label="search icon"
                type="button"
                onClick={this.onClickSearch}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <UserProfile />
            <JobFilters
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="profile-search-container">
            <div className="desk-search-container">
              <input
                type="search"
                onChange={this.onSearchInput}
                className="search-input"
                placeholder="Search"
                value={searchText}
              />
              <button
                className="search-button"
                aria-label="search icon"
                type="button"
                onClick={this.onClickSearch}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobsList-container">{this.renderJobsApiList()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
