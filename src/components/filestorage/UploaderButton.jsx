import React from 'react';
import { useItemFinishListener } from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';
import { Button } from '@material-ui/core';

function UploaderButton({ setUploadResponse, uploadType }) {
  const CustomButton = asUploadButton(
    React.forwardRef((props, ref) => (
      <Button
        {...props}
        variant="contained"
        color="primary"
        disabled={uploadType !== 'UPLOAD'}>
        Upload
      </Button>
    ))
  );

  useItemFinishListener(item => {
    const response = item.uploadResponse;
    setUploadResponse(response.data);
  });
  return (
    <>
      <CustomButton />
    </>
  );
}

export default UploaderButton;
