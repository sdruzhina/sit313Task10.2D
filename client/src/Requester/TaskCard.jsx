import React, { useState } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react' 
import './TaskCard.css';

function TaskCard(props) {
  // State for expanding the card
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  }

  const renderImage = () => {
    if (props.type === 'IMAGE' && props.setup.filename) {
      return(
        <Image src={'http://localhost:8080' + props.setup.filename} size='small' />
      );
    }
    return null;
  }

  const renderDetails = ()  => {
    return(
      <Card.Content>
        <div className='flex-content'>
          {renderImage()}
            <div className='flex-content'>
            <div className='task-details'>
              <p>{props.description}</p>
              <p>Number of workers required: {props.numberWorkers}</p>
              <p>Master workers: {props.master ? 'YES' : 'NO'}</p>
            </div>
            <Button>Test</Button>
          </div>
        </div>
      </Card.Content>
    );
  }

  return (
    <Card fluid onClick={expand}>
      <Card.Content>
          <Card.Header>{props.title}</Card.Header>
          <Card.Description>
            {(props.type.toLowerCase()).replace(/^.{1}/g, props.type[0].toUpperCase()) + ' Task'}
          </Card.Description>
      </Card.Content>
      {expanded ? renderDetails() : null}
      <Card.Content extra>
        <Icon name='dollar' />{props.reward}
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
