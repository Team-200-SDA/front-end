import React, { useState } from 'react';
import Uploady from '@rpldy/uploady';
import UploaderButton from './UploaderButton';
import { Dropdown } from 'semantic-ui-react';

function FileUploader({ setUploadResponse }) {
  // const [typeSelected, setTypeSelected] = useState(false);

  const fileTypes = [
    'PDF',
    'WORD DOCUMENT',
    'SPREADSHEET',
    'POWER POINT',
    'IMAGE',
    'LINK',
    'ZIP'
  ];

  const dropDownOptions = fileTypes.map(type => {
    return {
      key: type,
      text: type,
      value: type
    };
  });

  // const dropDownSelectionHandler = data => {
  //   setFileType(data);
  // };

  return (
    <Uploady
      destination={{
        url: `https://api.cloudinary.com/v1_1/dyge6kiwf/raw/upload`,
        params: { upload_preset: 'filestorage' }
      }}>
      <UploaderButton setUploadResponse={setUploadResponse} />
      {/* <Dropdown
        className="filetype-dropdown"
        onChange={(event, data) => dropDownSelectionHandler(data.value)}
        placeholder="File Icon"
        selection
        options={dropDownOptions}
      /> */}
    </Uploady>
  );
}

export default FileUploader;
