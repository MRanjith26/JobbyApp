import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import JobDetailsItem from './components/JobDetailsItem'
import SecuredRoute from './components/SecuredRoute'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <SecuredRoute exact path="/" component={Home} />
    <SecuredRoute exact path="/jobs" component={Jobs} />
    <SecuredRoute exact path="/jobs/:id" component={JobDetailsItem} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
