import './index.css'
import {Link} from 'react-router-dom'

//  import Icons from 'react-icons' package
import {MdStar} from 'react-icons/md'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcase} from 'react-icons/bs'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`jobs/${id}`} className="job-link-item">
      <li className="job-item">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="description-container">
          <h1 className="text-title">Description</h1>
          <p className="job-brief">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
