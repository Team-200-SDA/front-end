import { Button, FormLabel } from '@material-ui/core';
import React, { useState } from 'react';
import SubjectApi from '../../api/SubjectApi';
import ImageUploader from '../imageuploader/ImageUploader';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function CreateSubject({ getSubjects }) {
  const { language } = useContext(LangContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  /**
   * Create a POST request for a new subject object using the state values.
   * Reset values to default after request is done.
   */
  const createSubject = async () => {
    await SubjectApi.create({ name, description, link });
    setName('');
    setDescription('');
    setLink('');
    getSubjects();
  };

  return (
    <div className="card-body create-subject-div">
      <div className="creation-form">Create a new Subject</div>
      <div className="form-group subject-inputs">
        <FormLabel className="form-label" component="legend">
          {language.Enter_subject_name}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder="Subject Name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <FormLabel className="form-label" component="legend">
          {language.Enter_subject_description}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder="Subject Description"
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
