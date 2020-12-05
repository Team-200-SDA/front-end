/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FileUploader from './FileUploader';

export default function FileStorageForm({ uploadFile }) {
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
    console.log(fileData);

    setUploadResponse(null);
  }, [uploadResponse]);

  function getFilenameAndExtension(pathFilename) {
    const filenameExtension = pathFilename.replace(/^.*[\\\/]/, '');
    return filenameExtension.split('.').pop();
  }

  return (
    <div className="card card-filestorage">
      <h4 className="card-title-upload">File Storage</h4>
      <div className="card-body storage-uploader">
        <FileUploader setUploadResponse={setUploadResponse} />
      </div>
    </div>
  );
}
