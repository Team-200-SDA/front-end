import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import SubjectApi from '../../api/SubjectApi';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

function CreateSubject({ getSubjects }) {
  const { language } = useContext(LangContext);
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
    <div className="create-subject-div">
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
          {language.create_Subject}
        </Button>
      </div>
    </div>
  );
}

export default CreateSubject;
