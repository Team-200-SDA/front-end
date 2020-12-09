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
    <Card className="subject-body">
      <h3 className="card-title-upload">Create a Subject</h3>
      <div className="storage-uploader">
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
        <ImageUploader setImgUrl={setLink} uploadPreset={'subjects'} />
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
    </Card>
  );
}

export default CreateSubject;