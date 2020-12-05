import React from 'react';
import { useItemFinishListener } from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';
import { Button } from '@material-ui/core';

function UploaderButton({ setUploadResponse, typeSelected }) {
  const CustomButton = asUploadButton(
    React.forwardRef((props, ref) => (
      <Button
        {...props}
        variant="contained"
        color="primary"
        disabled={typeSelected ? false : true}>
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
