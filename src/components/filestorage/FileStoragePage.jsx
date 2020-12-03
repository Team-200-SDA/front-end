import React, { useEffect, useState } from "react";
import FileStorageApi from "../../api/FileStorageApi";
import FileStorageForm from "../filestorage/FileStorageForm";
import SelectSource from "../SelectSource";
import FileStorage from "./FileStorage";

export default function FileStoragePage() {
  const [files, setFiles] = useState([]);

  const getAll = () => {
    FileStorageApi.getAllFiles().then((res) => {
      setFiles(res.data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const uploadFile = (fileData) => {
    return FileStorageApi.uploadFile(fileData).then((res) => {
      alert("File Uploaded");
      setFiles([res.data, ...files]);
    });
  };

  const deleteFile = (fileId) => {
    return FileStorageApi.deleteFile(fileId).then(() => {
      alert("File Deleted");
      getAll();
    });
  };

  return (
    <div>
      <FileStorageForm onUploadFile={uploadFile} />

      {files.length === 0
        ? "No Files Uploaded."
        : files.map((file) => (
            <FileStorage key={file.id} file={file} onFileDelete={deleteFile} />
          ))}

          <SelectSource />
    </div>
  );
}
