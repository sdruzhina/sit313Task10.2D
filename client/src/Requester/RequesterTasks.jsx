import React from 'react';
import TaskList from './TaskList'
import './RequesterTasks.css';
import { Container, Header, Card, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function RequesterTasks() {
  return (
    <div>
      <Container>
        <Header as='h1'>
          Requester Tasks
        </Header>
        <Link to='/create'>
          <Button positive className="new-task-button">+ New Task</Button>
        </Link>
        <Card.Group>
          <TaskList />
        </Card.Group>
      </Container>
    </div>
  );
}

export default RequesterTasks;
