import React, { useState } from 'react';
import { Header, Form, Button } from 'semantic-ui-react';

function TaskSetupImage(props) {

  // Set up the question for the worker
  const [filename, setFilename] = useState(
    props.type === 'IMAGE' ? props.setup : {filename: ''}
  );

  // Upload handler
  const uploadImage = (event) => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
  
    fetch('http://localhost:8080/image-upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setFilename({filename: response.path});
      props.onTaskDetailsChange({name: 'setup', value: {filename: filename}});
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div>
      <Header inverted block color='grey'>Task Setup - Image Processing</Header>
      <Form className='form-container'>
      <Form.Field>
          This task will require the worker to tag objects in the uploaded image.
        </Form.Field>
        <Form.Group inline>
          <Form.Field>
            <label className='label'>Image</label>
            <input type='file' id='imageUpload' accept='.gif,.jpg,.jpeg,.png' onChange={uploadImage}></input>
          </Form.Field>
        </Form.Group>
      </Form>
      
    </div>
  );
}

export default TaskSetupImage;
