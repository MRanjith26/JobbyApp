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
  const {changeSalaryRange} = props

  const getSalaryId = event => {
    changeSalaryRange(event.target.id)
  }

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
            id={eachEmployment.employmentTypeId}
            onChange={getEmploymentId}
            name="employment"
          />
          <label
            htmlFor={eachEmployment.employmentTypeId}
            className="label-title"
          >
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }
  //  TODO: add salary range filter options (radio)

  const renderSalaryRangeFilterView = () => (
    <>
      {salaryRangesList.map(eachItem => (
        <li className="salary-item" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            className="radio-box"
            id={eachItem.salaryRangeId}
            onChange={getSalaryId}
            name="salary"
          />
          <label className="label-title" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </>
  )

  return (
    <>
      <ul className="employment-container">
        <h1 className="filter-heading">Type of Employment</h1>
        {renderEmploymentFilterView()}
      </ul>
      <ul className="salary-range-container">
        <h1 className="filter-heading">Salary Range</h1>
        {renderSalaryRangeFilterView()}
      </ul>
    </>
  )
}
export default JobFilters
