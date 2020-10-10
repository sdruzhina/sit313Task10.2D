import React from 'react';
import { Menu, Button, Container, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

function PageHeader() {
  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));

  const requesterMenu = 
    userData && userData.isRequester 
      ? <Menu.Item 
        as={NavLink}
        to='requester'
        activeClassName='active'
        name='Requester'
      />
      : null;

  const workerMenu = 
    userData && userData.isWorker 
      ? <Menu.Item 
        as={NavLink}
        to='worker'
        activeClassName='active'
        name='Worker'
      />
      : null;

  const loginLogoutButton =
    userData 
      ? <Menu.Item as={Link} to='logout' position='right'>
          <Button inverted={true}>
            Logout
          </Button>
        </Menu.Item>
      : <Menu.Item as={Link} to='login' position='right'>
          <Button inverted={true}>
            Log in
          </Button>
        </Menu.Item>;

  return (
    <div>
        <Segment
          inverted
          textAlign='center'
          vertical
        >
        <Menu
          inverted
          pointing
          secondary
          size='large'
        >
          <Container>
            <Menu.Item>
              <h3>iCrowdTask</h3>
            </Menu.Item>

            {requesterMenu}
            {workerMenu}

            {loginLogoutButton}
          </Container>
        </Menu>
      </Segment>
    </div>
  );
}

export default PageHeader;
