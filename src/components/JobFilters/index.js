// TODO: write code for filters

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilters = props => {
  const renderEmploymentFilterView = () => {
    const {changeEmploymentType} = props
    return employmentTypesList.map(eachEmployment => {
      const getEmploymentId = () => {
        changeEmploymentType(eachEmployment.employmentTypeId)
      }

      return (
        <li className="employment-item" key={eachEmployment.employmentTypeId}>
          <input
            type="checkbox"
            className="check-box"
            id="employment"
            onChange={getEmploymentId}
          />
          <label htmlFor="employment" className="label-title">
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  return (
    <>
      <ul className="employment-container">
        <p className="filter-heading">Type of Employment</p>
        {renderEmploymentFilterView()}
      </ul>
    </>
  )
}
export default JobFilters

//  renderSalaryRangeFilterView()
