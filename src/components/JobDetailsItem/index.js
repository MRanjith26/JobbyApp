// TODO: write code for job details on Click job item
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdStar} from 'react-icons/md'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcase} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'LOADING',
  failure: 'FAILURE',
}

class JobDetailsItem extends Component {
  state = {
    jobDetailsData: {},
    apiStatus: '',
    skillsData: [],
    CompanyData: [],
    similarData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobDetailsData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedJobDetailsData

      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        location: eachItem.location,
        jobDescription: eachItem.job_description,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
      }))
      console.log(updatedSimilarJobs)
      const updatedJobDetails = {
        id: jobDetails.id,
        title: jobDetails.title,
        rating: jobDetails.rating,
        location: jobDetails.location,
        employmentType: jobDetails.employment_type,
        packagePerAnnum: jobDetails.package_per_annum,
        websiteUrl: jobDetails.company_website_url,
        jobDescription: jobDetails.job_description,
        companyLogoUrl: jobDetails.company_logo_url,
      }
      const moreDetailsList = {
        skillsList: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
      }
      const {skillsList, lifeAtCompany} = moreDetailsList

      const updatedSkillList = skillsList.map(skill => ({
        name: skill.name,
        skillImage: skill.image_url,
      }))
      const updatedLAtCompany = {
        companyDescription: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetailsData: updatedJobDetails,
        skillsData: updatedSkillList,
        CompanyData: updatedLAtCompany,
        similarData: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickJobDetailsRetry = () => this.getJobItemDetails()

  renderJobDetailsFailureView = () => (
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
      <button
        type="button"
        className="try-button"
        onClick={this.onClickJobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderJobView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSimilarDetailsView = () => {
    const {similarData} = this.state
    return (
      <div className="similar-section">
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarData.map(similarJob => (
            <SimilarJobItem
              key={similarJob.id}
              similarJobDetails={similarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderSkillList = () => {
    const {skillsData} = this.state
    return (
      <div className="skills-container">
        <h1 className="skills-title">Skills</h1>
        <ul className="skills-card">
          {skillsData.map(eachSkill => (
            <li key={eachSkill.name} className="skill-item">
              <img
                src={eachSkill.skillImage}
                alt={eachSkill.name}
                className="skill-image"
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompanyView = () => {
    const {CompanyData} = this.state
    const {companyDescription, imageUrl} = CompanyData
    return (
      //  LAC --- Life At Company
      <div className="LAC-container">
        <h1 className="life-heading">Life at Company</h1>
        <div className="company-data-container">
          <p className="life-para">{companyDescription}</p>
          <img src={imageUrl} alt="life at company" className="life-image" />
        </div>
      </div>
    )
  }

  renderJobsDetailsCardView = () => {
    const {jobDetailsData} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      websiteUrl,
      jobDescription,
    } = jobDetailsData
    return (
      <div className="details-container">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="info-card">
            <h1 className="job-title">{title}</h1>
            <div className="rating-card">
              <MdStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details">
          <ul className="type-location-card">
            <li className="location-item">
              <FaMapMarkerAlt className="location-icon" />
              <p className="type-text">{location}</p>
            </li>
            <li className="type-item">
              <BsBriefcase className="type-icon" />
              <p className="type-text">{employmentType}</p>
            </li>
          </ul>
          <p className="salary-text">{packagePerAnnum}</p>
        </div>

        <div className="brief-container">
          <h1 className="job-para-title">Description</h1>
          <div className="visit-logo-url">
            <a href={websiteUrl} className="visit-text">
              Visit
            </a>
            <FiExternalLink className="link-icon" />
          </div>
        </div>
        <p className="brief">{jobDescription}</p>
        {this.renderSkillList()}
        {this.renderLifeAtCompanyView()}
      </div>
    )
  }

  renderSuccessView = () => (
    <>
      {this.renderJobsDetailsCardView()}
      {this.renderSimilarDetailsView()}
    </>
  )

  renderAllJobsAPiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderJobView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.renderAllJobsAPiStatusView()}
        </div>
      </>
    )
  }
}
export default JobDetailsItem
