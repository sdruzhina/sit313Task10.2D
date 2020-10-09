import React from 'react';
import { Container, Segment, Menu, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function PageHeader() {
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
            <Menu.Item 
              as={NavLink}
              to='create'
              activeClassName='active'
              name='Requester'
            />
            <Menu.Item position='right'>
              <Button as='a' inverted={true}>
                Sign in
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
    </div>
  );
}

export default PageHeader;
