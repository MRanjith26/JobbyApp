import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs, salary information, Company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
