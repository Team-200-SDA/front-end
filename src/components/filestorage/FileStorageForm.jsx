/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FileUploader from './FileUploader';

export default function FileStorageForm({ uploadFile }) {
  const [uploadResponse, setUploadResponse] = useState(null);
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    if (uploadResponse === null) {
      return;
    }
    const fileData = {
      fileName: uploadResponse.original_filename,
      link: uploadResponse.secure_url,
      type: fileType
    };
    uploadFile(fileData);
    setUploadResponse(null);
  }, [uploadResponse]);

  return (
    <div className="card card-filestorage">
      <h4 className="card-title-upload">File Storage</h4>
      <div className="card-body storage-uploader">
        <FileUploader setUploadResponse={setUploadResponse} setFileType={setFileType} />
      </div>
    </div>
  );
}
