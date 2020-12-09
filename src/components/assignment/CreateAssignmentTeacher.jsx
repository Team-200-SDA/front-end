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
import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

export default function CreateAssignmentTeacher({ getTeacherAssignments }) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadType, setUploadType] = useState('');

  function createAssignment() {
    if (link === '') {
      return;
    } //we don't want to post an assignment with no links.

    const newAssignment = {
      fileName: title,
      link: link,
      type:
        uploadType === 'UPLOAD'
          ? getFilenameAndExtension(uploadResponse.secure_url)
          : uploadType
    };

    AssignmentApi.createAssignment(newAssignment).then(res => {
      getTeacherAssignments();
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
    <div className="card card-filestorage">
      <h4 className="card-title-upload">{language.Create_Assignment}</h4>
      <div className="card-body storage-uploader">
        <FormControl component="fieldset">
          <FormLabel component="legend">{language.Assignment_Type}</FormLabel>
          <RadioGroup
            row
            aria-label="Assignment Type"
            value={uploadType}
            onChange={radioChange}>
            <FormControlLabel value="UPLOAD" control={<Radio />} label={language.Upload_File} />
            <FormControlLabel value="VIDEO" control={<Radio />} label={language.Video_Link}/>
            <FormControlLabel value="LINK" control={<Radio />} label={language.External_Link} />
          </RadioGroup>
        </FormControl>
        <div>
          <FileUploader setUploadResponse={setUploadResponse} uploadType={uploadType} />
        </div>
        <input
          className="form-control assignment"
          placeholder={language.Assignment_name}
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={uploadType === ''}
        />
        <input
          className="form-control assignment"
          placeholder={language.Link_Assignment}
          value={link}
          onChange={event => setLink(event.target.value)}
          disabled={uploadType === 'UPLOAD' || uploadType === ''}
        />
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
    </div>
  );
}