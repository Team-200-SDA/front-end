import { Button, FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import SubjectApi from '../../api/SubjectApi';

function CreateSubject({ getSubjects }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const createSubject = async () => {
    await SubjectApi.create({ name, description });
    setName('');
    setDescription('');
    getSubjects();
  };

  return (
    <div className="card card-filestorage">
      <h4 className="card-title-upload">Create a Subject</h4>
      <div className="card-body storage-uploader">
        <FormLabel component="legend">Subject Name and Description</FormLabel>
        <input
          className="form-control assignment"
          placeholder="Subject Name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          className="form-control assignment"
          placeholder="Subject Description..."
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <div className="form-group">
          <Button
            className="upload-button"
            variant="contained"
            color="primary"
            onClick={createSubject}
            disabled={name === '' || description === ''}>
            Create Subject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateSubject;
