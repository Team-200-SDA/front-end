import { Button, FormLabel } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import AssignmentApi from '../../api/AssignmentApi';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import FileUploader from '../filestorage/FileUploader';
import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

export default function CreateAssignmentStudent({
  assignments,
  getAllAssignments,
  teacherAssignments
}) {
  const { language } = useContext(LangContext);
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

  const filteredDropDown = teacherAssignments.filter(
    assignment => !assignments.find(assigned => assigned.fileName === assignment.fileName)
  );

  const dropDownOptions = filteredDropDown.map(assignment => {
    return {
      key: uuid(),
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
    <div className="card-body create-assignment-div">
      <div className="creation-form">{language.Submit_Assignment}</div>
      <div className="lecture-create-form">
        <FormLabel component="legend">{language.Select_assignment}</FormLabel>
        <div className="submit-dropdown">
          <Dropdown
            className="conversation-dropdown"
            onChange={(event, data) => setTitle(data.value)}
            placeholder={language.Choose_assignment}
            selection
            options={dropDownOptions}
            defaultValue=""
          />
        </div>
        <FormLabel component="legend">Upload assignment</FormLabel>
        <FileUploader
          setUploadResponse={setUploadResponse}
          uploadType={title === '' ? null : 'UPLOAD'}
        />
        <div className="form-group submit-assignment-button">
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
  );
}
