import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";

function LoginForm() {

  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Redirect to='/login' />;

}

export default LoginForm;