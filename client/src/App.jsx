import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PageHeader from './PageHeader';
import RequesterTasks from './Requester/RequesterTasks';
import CreateTask from './Requester/CreateTask';
import WorkerTasks from './Worker/WorkerTasks';
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';
import Logout from './Auth/Logout';
import RequesterRoute from './Auth/RequesterRoute';
import WorkerRoute from './Auth/WorkerRoute';
import './App.css';


function App() {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  let redirect;
  if(userData) {
    if(userData.isWorker) {
      redirect = <Redirect to='/worker' />;
    }
    if(userData.isRequester) {
      redirect = <Redirect to='/requester' />;
    }
  }
  else {
    redirect = <Redirect to='/login' />;
  }

  return (
    <div className="App">
      <Router>
      <PageHeader />
        <Route exact path='/'>
          {redirect}
        </Route>
        <RequesterRoute path='/requester' component={RequesterTasks} />
        <RequesterRoute path='/create' component={CreateTask} />
        <WorkerRoute path='/worker' component={WorkerTasks} />
        <Route path='/signup' component={SignupForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/logout' component={Logout} />
      </Router>
    </div>
  );
}

export default App;
