import React, { useState } from 'react';
import TaskList from './TaskList'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import './WorkerTasks.css';
import { Container, Header, Card, Input, Divider } from 'semantic-ui-react'

function WorkerTasks() {

  // Today
  const today = new Date();

  // State
  const [searchString, setSearchString] = useState('');
  const [dateFilter, setDateFilter] = useState({ 
    from: today,
    to: null
  });

  return (
    <div>
      <Container>
        <Header as='h1'>
          Worker Tasks
        </Header>
        <div className='filters'>
          <Input 
            icon='search'
            placeholder='Search'
          />
          <div>
            <div className='date-filter'>
              <label htmlFor='dateFrom'>Expiry Date from </label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateFrom'
                minDate={today}
                maxDate={dateFilter.to ? dateFilter.to : null}
                value={dateFilter.from}
                onChange={console.log()}
              />
              <label htmlFor='dateTo'>to</label>
              <SemanticDatepicker 
                datePickerOnly={true}
                name='dateTo'
                minDate={dateFilter.from ? dateFilter.from : today}
                value={dateFilter.to}
                onChange={console.log()}
              />
            </div>
          </div>
        </div>
        <Divider style={{margin: '10px 0 20px 0'}} />
        <Card.Group>
          <TaskList />
        </Card.Group>
      </Container>
    </div>
  );
}

export default WorkerTasks;
