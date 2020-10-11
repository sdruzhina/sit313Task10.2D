import React from 'react';
import TaskList from './TaskList'
import './WorkerTasks.css';
import { Container, Header, Card, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function WorkerTasks() {
  return (
    <div>
      <Container>
        <Header as='h1'>
          Worker Tasks
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

export default WorkerTasks;
