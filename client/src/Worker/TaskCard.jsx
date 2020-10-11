import React, { useState } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react' 
import './TaskCard.css';

function TaskCard(props) {
  // State for expanding the card
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  }

  // Handle task deletion
  const deleteTask = (e, data) => {
    console.log(data);
    props.onDelete(data.name);
  }

  // Show the image if the task is of the image processing type
  const renderImage = () => {
    if (props.type === 'IMAGE' && props.setup.filename) {
      return(
        <Image src={'http://localhost:8080' + props.setup.filename} size='small' className='task-image'/>
      );
    }
    return null;
  }

  // The part of the task card which is hidden and expands on click
  const renderDetails = ()  => {
    return(
      <Card.Content>
        <div className='flex-content'>
          {renderImage()}
            <div className='container'>
              <div>
                <Card.Description className='description'>{props.description}</Card.Description>
                <Card.Meta>Number of workers required: {props.numberWorkers}</Card.Meta>
                <Card.Meta>Master workers: {props.master ? 'YES' : 'NO'}</Card.Meta>
              </div>
            <Button 
              floated='right' 
              color='red' 
              name={props.id}
              onClick={deleteTask}
            >Delete</Button>
          </div>
        </div>
      </Card.Content>
    );
  }

  return (
    <Card fluid>
      <Card.Content onClick={expand} className='clickable'>
        <Card.Header>{props.title}</Card.Header>
      </Card.Content>
      {expanded ? renderDetails() : null}
      <Card.Content extra>
        <Icon name='dollar' />{props.reward}
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
