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

export default function CreateLecture(props) {
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
          : uploadType
    };

    LectureApi.createLecture(newLecture).then(res => {
      props.getAllLectures();
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
      <h4 className="card-title-upload">Create a Lecture</h4>
      <div className="card-body storage-uploader">
        <FormControl component="fieldset">
          <FormLabel component="legend">Lecture Type</FormLabel>
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
        <input
          className="form-control assignment"
          placeholder="Lecture name..."
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={uploadType === ''}
        />
        <input
          className="form-control assignment"
          placeholder="Link to Lecture"
          value={link}
          onChange={event => setLink(event.target.value)}
          disabled={uploadType === 'UPLOAD' || uploadType === ''}
        />
        <div className="form-group">
          <Button
            className="upload-button"
            variant="contained"
            color="primary"
            onClick={createLecture}
            disabled={title === '' || link === ''}>
            Publish Lecture
          </Button>
        </div>
      </div>
    </div>
  );
}
