import React from 'react';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';

/**
 * This Component provides private file storage space for the current user
 * Displays the files stored by current user and allows the user to delete the file
 */
export default function FileStorage({ file, onFileDelete }) {
  // fileTypeImageFA function takes file type as parameter and returns the icon based on the file type
  const fileType = fileTypeImageFA(file.type);

  return (
    <div className="card-body card-body-filestorage">
      <i className={`fas ${fileType} file-type-icons`} />
      <span>
        <a className="file-link" target="_blank" rel="noreferrer" href={file.link}>
          {file.fileName}
        </a>
      </span>
      <i className="fas fa-trash file-delete" onClick={() => onFileDelete(file.id)}></i>
    </div>
  );
}
