import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import AssignmentApi from '../../api/AssignmentApi';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import FileUploader from '../filestorage/FileUploader';
import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

export default function CreateAssignment({
  assignments,
  getAllAssignments,
  teacherAssignments
}) {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);
  console.log(assignments);

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

  const filteredDropDown = teacherAssignments.filter(
    assignment => !assignments.find(assigned => assigned.fileName === assignment.fileName)
  );

  const dropDownOptions = filteredDropDown.map(assignment => {
    return {
      key: assignment.fileName,
      text: assignment.fileName,
      value: assignment.fileName
    };
  });

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    setLink(uploadResponse.secure_url);
  }, [uploadResponse]);

  return (
    <>
      <div className="card card-filestorage">
        <h4 className="card-title-upload">{language.Submit_Assignment}</h4>
        <div className="card-body storage-uploader">
          <p>{language.Upload_file}</p>
          <FileUploader
            setUploadResponse={setUploadResponse}
            uploadType={title === '' ? null : 'UPLOAD'}
          />
          <div className="submit-dropdown">
            <Dropdown
              className="conversation-dropdown"
              onChange={(event, data) => setTitle(data.value)}
              placeholder={language.Choose_assignment}
              selection
              options={dropDownOptions}
            />
          </div>
          <div className="form-group">
            <Button
              className="upload-button"
              variant="contained"
              color="primary"
              disabled={link === ''}
              onClick={createAssignment}>
              {language.Submit_Assignment}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
