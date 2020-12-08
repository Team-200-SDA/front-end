/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FileUploader from './FileUploader';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function FileStorageForm({ uploadFile }) {
  const { language } = useContext(LangContext);
  const [uploadResponse, setUploadResponse] = useState(null);

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    const fileData = {
      fileName: uploadResponse.original_filename,
      link: uploadResponse.secure_url
    };
    uploadFile(fileData);
    setUploadResponse(null);
  }, [uploadResponse]);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{language.File_Storage}</h4>
        <div className="container col-sm-12 col-md-10 col-lg-8">
          <FileUploader setUploadResponse={setUploadResponse} />
        </div>
      </div>
    </div>
  );
}
