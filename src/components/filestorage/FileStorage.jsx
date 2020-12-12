import React from 'react';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';

export default function FileStorage({ file, onFileDelete }) {
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
