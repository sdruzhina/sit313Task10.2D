import React, { useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";

function LoginForm() {
  // Router history
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Redirect to='/login' />;

}

export default LoginForm;