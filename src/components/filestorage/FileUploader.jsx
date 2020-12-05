import React, { useState } from 'react';
import Uploady from '@rpldy/uploady';
import UploaderButton from './UploaderButton';
import { Dropdown } from 'semantic-ui-react';

function FileUploader({ setUploadResponse, setFileType }) {
  const [typeSelected, setTypeSelected] = useState(false);

  const fileTypes = [
    'PDF',
    'WORD DOCUMENT',
    'SPREADSHEET',
    'POWER POINT',
    'IMAGE',
    'LINK',
    'ZIP',
    'OTHER'
  ];

  const dropDownOptions = fileTypes.map(type => {
    return {
      key: type,
      text: type,
      value: type
    };
  });

  const dropDownSelectionHandler = (event, data) => {
    setFileType(data);
    setTypeSelected(true);
  };

  return (
    <div className="uploader">
      <Uploady
        destination={{
          url: `https://api.cloudinary.com/v1_1/dyge6kiwf/raw/upload`,
          params: { upload_preset: 'filestorage' }
        }}>
        <UploaderButton
          setUploadResponse={setUploadResponse}
          typeSelected={typeSelected}
        />
      </Uploady>
      <Dropdown
        className="filetype-dropdown"
        onChange={(event, data) => dropDownSelectionHandler(data.value)}
        placeholder="File Format"
        selection
        options={dropDownOptions}
      />
    </div>
  );
}

export default FileUploader;
