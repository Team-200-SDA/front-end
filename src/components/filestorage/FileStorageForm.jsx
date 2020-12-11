/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import getFilenameAndExtension from '../../js/functions/fileUpload/getFilenameAndExtention';
import FileUploader from './FileUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
import { FormLabel } from '@material-ui/core';

export default function FileStorageForm({ uploadFile }) {
  const { language } = useContext(LangContext);
  const [uploadResponse, setUploadResponse] = useState(null);

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    const fileData = {
      fileName: uploadResponse.original_filename,
      link: uploadResponse.secure_url,
      type: getFilenameAndExtension(uploadResponse.secure_url)
    };
    uploadFile(fileData);
    setUploadResponse(null);
  }, [uploadResponse]);

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-archive title-icon" />
          {language.File_Storage}
        </h1>
      </div>
      <div className="card-body card-filestorage">
        <FormLabel component="legend">{language.File_Storage}</FormLabel>
        <div className="storage-uploader">
          <FileUploader setUploadResponse={setUploadResponse} uploadType={`UPLOAD`} />
        </div>
      </div>
    </>
  );
}
