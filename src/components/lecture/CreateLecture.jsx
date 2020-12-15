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
import { LangContext } from '../../js/states/LanguageContext';

export default function CreateLecture({ urlParams, getAllLectures }) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadType, setUploadType] = useState('');

  /**
   * Creates a lecture object based on state values.
   * Do a POST request with the lecture as the payload.
   * Resets state values.
   * Updates list of lecture by doing a GET request.
   */
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

  /**
   *
   * @param {*} event
   * Set the upload type state based on radio button selection.
   */
  function radioChange(event) {
    setUploadType(event.target.value);
  }

  /**
   * Whenever a file is uploaded, set the link state to the url where the file is stored.
   */
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
      <div className="creation-form">{language.Create_new_Lecture}</div>
      <div className="form-group lecture-create-form">
        <div className="storage-uploader">
          <FormControl component="fieldset">
            <FormLabel component="legend">{language.Select_lecture_type}</FormLabel>
            <RadioGroup
              row
              aria-label="Assignment Type"
              value={uploadType}
              onChange={radioChange}>
              <FormControlLabel value="UPLOAD" control={<Radio />} label={language.Upload_File} />
              <FormControlLabel value="VIDEO" control={<Radio />} label={language.Video_Link} />
              <FormControlLabel value="LINK" control={<Radio />} label={language.External_Link} />
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
          placeholder={language.Lecture_Name}
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={uploadType === ''}
        />
        <FormLabel className="form-label" component="legend">
          {language.Link_Lecture}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={language.Link_Lecture}
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
