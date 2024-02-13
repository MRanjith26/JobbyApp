import './index.css'

import {MdStar} from 'react-icons/md'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcase} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item">
      <div className="company-details">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="similar-title">Description</h1>
      <p className="similar-job-brief">{jobDescription}</p>
      <ul className="similar-type-container">
        <li className="similar-item">
          <FaMapMarkerAlt className="location-icon" />
          <p className="type-text">{location}</p>
        </li>
        <li className="similar-item">
          <BsBriefcase className="type-icon" />
          <p className="type-text">{employmentType}</p>
        </li>
      </ul>
    </li>
  )
}
export default SimilarJobItem
