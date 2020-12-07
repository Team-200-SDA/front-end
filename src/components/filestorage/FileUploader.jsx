import React from 'react';
import Uploady from '@rpldy/uploady';
import UploaderButton from './UploaderButton';

function FileUploader({ setUploadResponse, uploadType }) {
  return (
    <Uploady
      destination={{
        url: `https://api.cloudinary.com/v1_1/dyge6kiwf/raw/upload`,
        params: { upload_preset: 'filestorage' }
      }}>
      <UploaderButton setUploadResponse={setUploadResponse} uploadType={uploadType} />
    </Uploady>
  );
}

export default FileUploader;
