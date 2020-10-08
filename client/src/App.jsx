import React from 'react';
import './App.css';
import PageHeader from './PageHeader';
import RequesterTasks from './RequesterTasks';
import CreateTask from './CreateTask';
import SignupForm from './Auth/SignupForm';
import LoginForm from './Auth/LoginForm';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <PageHeader />
      <Router>
        <Route exact path='/' component={RequesterTasks} />
        <Route path='/create' component={CreateTask} />
        <Route path='/signup' component={SignupForm} />
        <Route path='/login' component={LoginForm} />
      </Router>
    </div>
  );
}

export default App;
