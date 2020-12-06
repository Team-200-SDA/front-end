import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AssignmentApi from '../../api/AssignmentApi';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import FileUploader from '../filestorage/FileUploader';

export default function CreateAssignment({ getAllAssignments }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const [uploadResponse, setUploadResponse] = useState(null);

  function createAssignment() {
    if (link === '') {
      return;
    } //we don't want to post an assignment with no links.

    const newAssignment = {
      fileName: title,
      link: link,
      type: getFilenameAndExtension(uploadResponse.secure_url)
    };

    AssignmentApi.createAssignment(newAssignment).then(res => {
      setLink('');
      setTitle('');
      setUploadResponse(null);
      getAllAssignments();
    });
  }

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    setTitle(uploadResponse.original_filename);
    setLink(uploadResponse.secure_url);
  }, [uploadResponse]);

  return (
    <>
      <div className="card card-filestorage">
        <div className="card-body storage-uploader">
          <p>Upload a file from your local-storage?</p>
          <FileUploader setUploadResponse={setUploadResponse} uploadType={'UPLOAD'} />
          <input
            className="form-control assignment"
            placeholder="Assignment name..."
            value={title}
            onChange={event => setTitle(event.target.value)}
          />{' '}
          <div className="form-group">
            <Button
              className="upload-button"
              variant="contained"
              color="primary"
              onClick={createAssignment}>
              Submit Assignment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
