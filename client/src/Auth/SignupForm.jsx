import React from 'react';
import { Button, Form, Checkbox, Grid, Header, Message, Segment } from 'semantic-ui-react';
import './SignupForm.css';

const SignupForm = () => (
  <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='blue' textAlign='center'>
        Create iCrowdTask Account
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input 
            fluid 
            placeholder='First name'
            type='text'
            name='firstName' 
          />
          <Form.Input 
            fluid 
            placeholder='Last name'
            type='text'
            name='lastName' 
          />
          <Form.Input 
            fluid 
            placeholder='Email address'
            type='email'
            name='email' 
          />
          <Form.Input
            fluid
            placeholder='Password'
            type='password'
            name='password'
          />
          <Form.Input
            fluid
            placeholder='Password confirmation'
            type='password'
            name='passwordConfirm'
          />
          <div className='form-flex'>
            <Form.Field>
              Sign up as: 
            </Form.Field>
            <Form.Field>
              <Checkbox
                className='flex-item'
                label='Requester'
                name='isRequester'
                value={true}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                className='flex-item'
                label='Worker'
                name='isWorker'
                value={false}
              />
            </Form.Field>
          </div>
          <Button color='blue' fluid size='large'>
            Create Account
          </Button>
        </Segment>
      </Form>
      <Message>
        Have an account? <a href='/login'>Log in</a>
      </Message>
    </Grid.Column>
  </Grid>
)

export default SignupForm;