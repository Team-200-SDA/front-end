import { Button, Card, FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import SubjectApi from '../../api/SubjectApi';
import ImageUploader from '../imageuploader/ImageUploader';

function CreateSubject({ getSubjects }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const createSubject = async () => {
    await SubjectApi.create({ name, description, link });
    setName('');
    setDescription('');
    setLink('');
    getSubjects();
  };

  return (
    <div className="card-body create-subject-div">
      <div className="form-group">
        
        <input
          className="form-control"
          placeholder="Subject Name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <input
          className="form-control"
          placeholder="Subject Description..."
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <ImageUploader setImgUrl={setLink} uploadPreset={'subjects'} />

        </div>

        <div className="form-group">
          <Button
            className="upload-button"
            variant="contained"
            color="primary"
            onClick={createSubject}
            disabled={name === '' || description === '' || link === ''}>
            Create Subject
          </Button>
        </div>

      </div>
  );
}

export default CreateSubject;
