import React from 'react';
import Uploady from '@rpldy/uploady';
import UploaderButton from './UploaderButton';

function FileUploader({ setUploadResponse, uploadType }) {
  return (
    <Uploady
      destination={{
        url: process.env.REACT_APP_CLOUDINARY_RAW,
        params: { upload_preset: 'filestorage' }
      }}>
      <UploaderButton setUploadResponse={setUploadResponse} uploadType={uploadType} />
    </Uploady>
  );
}

export default FileUploader;
