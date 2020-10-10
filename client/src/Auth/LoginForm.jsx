import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

function LoginForm() {
  // Router history
  const history = useHistory();

  // Form data
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  
  // Event handler
  const handleChange = (e, data) => {
    const {name, value} = data;
    setUserCredentials((data) => {
      return {
        ...data,
        [name]: value
      };
    });
  }
  
  const loginUser = async (e) => {
    e.preventDefault();

    // Send credentials to backend
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })
    .then(response => response.json())
    .then((response) => {
      if (response.token) {
        localStorage.setItem('JWT', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        history.push(response.user.isRequester ? '/requester' : '/worker');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          iCrowdTask Login
        </Header>
        <Form size='large' onSubmit={loginUser}>
          <Segment stacked>
          <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='Email address'
              type='email'
              name='email'
              required
              onChange={handleChange} 
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              required
              onChange={handleChange}
            />
            <Button color='blue' fluid size='large' type='submit'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;