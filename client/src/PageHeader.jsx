import React from 'react';
import { Container, Segment, Menu, Button } from 'semantic-ui-react'

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
            <Menu.Item as='a' active>Requesters</Menu.Item>
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
