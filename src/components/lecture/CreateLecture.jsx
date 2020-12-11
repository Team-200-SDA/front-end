import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import LectureApi from '../../api/LectureApi';
import FileUploader from '../filestorage/FileUploader';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function CreateLecture({ urlParams, getAllLectures }) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadType, setUploadType] = useState('');

  function createLecture() {
    if (link === '') {
      return;
    } //we don't want to post a Lecture with no links.

    const newLecture = {
      fileName: title,
      link: link,
      type:
        uploadType === 'UPLOAD'
          ? getFilenameAndExtension(uploadResponse.secure_url)
          : uploadType,
      subject: { id: urlParams.id }
    };

    LectureApi.createLecture(newLecture).then(res => {
      getAllLectures();
      setLink('');
      setTitle('');
      setUploadResponse(null);
    });
  }

  function radioChange(event) {
    setUploadType(event.target.value);
  }

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    setTitle(uploadResponse.original_filename);
    setLink(uploadResponse.secure_url);
    setUploadType('UPLOAD');
  }, [uploadResponse]);

  return (
    <div className="card-body create-lecture-div">
      <div className="creation-form">Create a new Lecture</div>
      <div className="form-group lecture-create-form">
        <div className="storage-uploader">
          <FormControl component="fieldset">
            <FormLabel component="legend">Select lecture type</FormLabel>
            <RadioGroup
              row
              aria-label="Assignment Type"
              value={uploadType}
              onChange={radioChange}>
              <FormControlLabel value="UPLOAD" control={<Radio />} label="Upload File" />
              <FormControlLabel value="VIDEO" control={<Radio />} label="Video Link" />
              <FormControlLabel value="LINK" control={<Radio />} label="External Link" />
            </RadioGroup>
          </FormControl>

          <div>
            <FileUploader setUploadResponse={setUploadResponse} uploadType={uploadType} />
          </div>
        </div>
      </div>

      <div className="form-group lecture-inputs">
        <FormLabel className="form-label" component="legend">
          {language.Enter_lecture_name}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={langauge.Lecture_Name}
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={uploadType === ''}
        />
        <FormLabel className="form-label" component="legend">
          Link to the lecture
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder="Link to the Lecture"
          value={link}
          onChange={event => setLink(event.target.value)}
          disabled={uploadType === 'UPLOAD' || uploadType === ''}
        />
      </div>

      <div className="form-group">
        <Button
          className="upload-button"
          variant="contained"
          color="primary"
          onClick={createLecture}
          disabled={title === '' || link === ''}>
          {language.Publish_Lecture}
        </Button>
      </div>
    </div>
  );
}
