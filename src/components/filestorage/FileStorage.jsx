import React from 'react';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';

export default function FileStorage({ file, onFileDelete }) {
  const { language } = useContext(LangContext);
  return (
    <div className="card card-filestorage">
      <div className="card-body-filestorage">
        <img className="file-type" src={fileTypeImage(file.type)} alt="" />
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={file.link}>
            {file.fileName}
          </a>
        </span>
        <button
          className="btn btn-danger file-delete"
          onClick={() => onFileDelete(file.id)}>
          {language.Delete}
        </button>
      </div>
    </div>
  );
}
