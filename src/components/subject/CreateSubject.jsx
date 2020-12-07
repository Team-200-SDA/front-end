import { Button, FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import SubjectApi from '../../api/SubjectApi';

function CreateSubject() {
  const [name, setName] = useState('');

  const createSubject = async () => {
    const response = await SubjectApi.create({ name });
    console.log(response);
    console.log(name);
  };

  return (
    <div className="card card-filestorage">
      <h4 className="card-title-upload">Create a Subject</h4>
      <div className="card-body storage-uploader">
        <FormLabel component="legend">Choose a Subject Name </FormLabel>
        <input
          className="form-control assignment"
          placeholder="Subject Name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <div className="form-group">
          <Button
            className="upload-button"
            variant="contained"
            color="primary"
            onClick={createSubject}
            disabled={name === ''}>
            Create Subject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateSubject;
