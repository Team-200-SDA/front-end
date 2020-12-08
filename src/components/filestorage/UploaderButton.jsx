import React from 'react';
import { useItemFinishListener } from '@rpldy/uploady';
import { asUploadButton } from '@rpldy/upload-button';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';


function UploaderButton({ setUploadResponse }) {
  const { language } = useContext(LangContext);
  const CustomButton = asUploadButton(
    React.forwardRef((props, ref) => (
      <Button {...props} variant="contained" color="primary">
       {language.Upload}
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
