/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Uploady, { useItemProgressListener } from '@rpldy/uploady';
import UploaderButton from './UploaderButton';
import { Circle } from 'rc-progress';

// Sub-component used to render a simple loading circle to the screen
// while upload percentage has not yet reached 100
const UploadProgress = () => {
  const [progress, setProgress] = useState(0);
  const progressData = useItemProgressListener();

  useEffect(() => {
    if (progressData && progressData.completed > progress) {
      setProgress(() => progressData.completed);
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  }, [progressData]);

  const circle =
    progressData && progress && progressData.completed > 0 ? (
      <Circle
        className="upload-circle"
        style={{ height: '100px' }}
        strokeWidth={5}
        strokeColor={progress === 100 ? '#2f6886' : '#00a626'}
        percent={progress}
      />
    ) : null;

  return circle;
};

function FileUploader({ setUploadResponse, uploadType }) {
  return (
    <Uploady
      destination={{
        url: process.env.REACT_APP_CLOUDINARY_RAW,
        params: { upload_preset: 'filestorage' }
      }}>
      <UploaderButton setUploadResponse={setUploadResponse} uploadType={uploadType} />
      <UploadProgress />
    </Uploady>
  );
}

export default FileUploader;
