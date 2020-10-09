import React from 'react';
import {
    BrowserRouter as Router, 
    Route,
    Redirect
  } from 'react-router-dom'

function RequesterRoute({ component: Component, ...rest }) {
    const userData = JSON.parse(localStorage.getItem('user'));
    return (
        <Route {...rest} render={(props) => (
            userData && userData.isRequester 
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
}
export default RequesterRoute;
