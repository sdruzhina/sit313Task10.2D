import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='blue' textAlign='center'>
        iCrowdTask Login
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input 
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='Email address'
            type='email'
            name='email' 
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
          />
          <Button color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        Don't have an account? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm;