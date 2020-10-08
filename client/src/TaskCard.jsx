import React from 'react';
import { Card } from 'semantic-ui-react' 

function TaskCard(props) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>${props.reward}</Card.Meta>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
