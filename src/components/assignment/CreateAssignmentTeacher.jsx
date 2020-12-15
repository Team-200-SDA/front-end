import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AssignmentApi from '../../api/AssignmentApi';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import FileUploader from '../filestorage/FileUploader';
import { LangContext } from '../../js/states/LanguageContext';
import { useContext } from 'react';

export default function CreateAssignmentTeacher({ getTeacherAssignments }) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadType, setUploadType] = useState('');

  /**
   * Create an assignment object using state.
   * The file type in the object is determined using the getFilenameAndExtension function.
   * Do a POST request with the object ot the backend.
   * Reset state values.
   */
  function createAssignment() {
    if (link === '') {
      return;
    } //we don't want to post an assignment with no links.
    const newAssignment = {
      fileName: title,
      link: link,
      dueDate: dueDate,
      type:
        uploadType === 'UPLOAD'
          ? getFilenameAndExtension(uploadResponse.secure_url)
          : uploadType
    };
    AssignmentApi.createAssignment(newAssignment).then(res => {
      getTeacherAssignments();
      setLink('');
      setTitle('');
      setDueDate('');
      setUploadResponse(null);
    });
  }

  /**
   * @param {*} event
   * Set the upload type state based on radio button selection.
   */
  function radioChange(event) {
    setUploadType(event.target.value);
  }

  /**
   * Whenever a file is uploaded, set the title and link states with the correct
   * values based on the upload response.
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
    <div className="card-body create-assignment-div">
      <div className="creation-form">{language.Create_new_Assignment}</div>
      <div className="form-group lecture-create-form">
        <div className="storage-uploader">
          <FormControl component="fieldset">
            <FormLabel component="legend">{language.Assignment_Type}</FormLabel>

            <RadioGroup
              row
              aria-label="Assignment Type"
              value={uploadType}
              onChange={radioChange}>
              <FormControlLabel
                value="UPLOAD"
                control={<Radio />}
                label={language.Upload_File}
              />
              <FormControlLabel
                value="VIDEO"
                control={<Radio />}
                label={language.Video_Link}
              />
              <FormControlLabel
                value="LINK"
                control={<Radio />}
                label={language.External_Link}
              />
            </RadioGroup>
          </FormControl>

          <div>
            <FileUploader setUploadResponse={setUploadResponse} uploadType={uploadType} />
          </div>
        </div>
      </div>

      <div className="form-group assignment-inputs">
        <FormLabel className="form-label" component="legend">
          {language.Enter_assignment_name}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={language.Assignment_name}
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={uploadType === ''}
        />

        <FormLabel className="form-label" component="legend">
          {language.link}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder={language.link}
          value={link}
          onChange={event => setLink(event.target.value)}
          disabled={uploadType === 'UPLOAD' || uploadType === ''}
        />
        <FormLabel className="form-label" component="legend">
          {language.Due_Date}
        </FormLabel>
        <input
          className="form-control subject-input"
          placeholder="Due Date"
          value={dueDate}
          onChange={event => setDueDate(event.target.value)}
        />
      </div>

      <div className="form-group">
        <Button
          className="upload-button"
          variant="contained"
          color="primary"
          onClick={createAssignment}
          disabled={title === '' || link === ''}>
          {language.Create_Assignment}
        </Button>
      </div>
    </div>
  );
}
