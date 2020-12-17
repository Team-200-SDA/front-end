import React, { useEffect, useState } from 'react';
import FileStorageApi from '../../api/FileStorageApi';
import FileStorageForm from '../filestorage/FileStorageForm';
import FileStorage from './FileStorage';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

/**
 * This Component provides private file storage space for the current user
 * Allows the user to upload file from local storage and store it through Api calls
 * Displays the files stored by current user and allows the user to delete the file
 */
export default function FileStoragePage() {
  const { language } = useContext(LangContext);
  const [files, setFiles] = useState([]);

  /**
   * Calls Api to get all files stored by current user
   */
  const getAll = () => {
    FileStorageApi.getAllFiles().then(res => {
      setFiles(res.data);
    });
  };

  /**
   * Whenever the page is loaded, it gets all the files stored by current user
   */
  useEffect(() => {
    getAll();
  }, []);

  /**
   *
   * @param {Array} fileData
   * Calls Api to store chosen file details and alerts the user that file is uploaded
   */
  const uploadFile = async fileData => {
    const res = await FileStorageApi.uploadFile(fileData);
    setFiles([...files, res.data]);
  };

  /**
   *
   * @param {num} fileId
   * Calls Api to delete the file by id
   */
  const deleteFile = async fileId => {
    await FileStorageApi.deleteFile(fileId);
    alert(language.File_Deleted);
    getAll();
  };

  return (
    <div>
      <FileStorageForm uploadFile={uploadFile} />
      {files.length === 0
        ? null
        : files.map(file => (
            <FileStorage key={file.id} file={file} onFileDelete={deleteFile} />
          ))}
    </div>
  );
}
