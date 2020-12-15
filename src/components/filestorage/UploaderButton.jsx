import React from 'react';
import { useItemFinishListener } from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function UploaderButton({ setUploadResponse, uploadType }) {
  const { language } = useContext(LangContext);
  const CustomButton = asUploadButton(
    React.forwardRef((props, ref) => (
      <Button
        {...props}
        variant="contained"
        color="primary"
        disabled={uploadType !== 'UPLOAD'}>
        {language.Upload}
      </Button>
    ))
  );

  /**
   * useItemFinishListener will run after an upload is complete.
   * We use it to set a state value with the upload response.
   */
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
