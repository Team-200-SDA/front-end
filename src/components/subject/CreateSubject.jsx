import { Button, FormLabel } from '@material-ui/core';
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
      <div className="creation-form">{language.Create_new_Subject}</div>
      <div className="form-group subject-inputs">
        <FormLabel className="form-label" component="legend">
          {language.Enter_subject_name}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={language.Subject_Name}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <FormLabel className="form-label" component="legend">
          {language.Enter_subject_description}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={language.Subject_Description}
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <ImageUploader setImgUrl={setLink} uploadPreset={'subjects'} />
      </div>
      <div className="create-subject-button">
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
