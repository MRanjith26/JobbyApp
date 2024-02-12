import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import SecuredRoute from './components/SecuredRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.
/* const employmentTypesList = [
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
] */

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <SecuredRoute exact path="/" component={Home} />
    <SecuredRoute exact path="/jobs" component={Jobs} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
