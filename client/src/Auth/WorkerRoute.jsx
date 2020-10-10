import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router, 
    Route,
    Redirect
  } from 'react-router-dom'

function WorkerRoute({ component: Component, ...rest }) {
    // User data state
    const [userData, setUserData] = useState(null);
    // Load user on mount
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, []);

    return (
        <Route {...rest} render={(props) => (
            userData && userData.isWorker 
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
}
export default WorkerRoute;
