import React from 'react';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function FileStorage({ file, onFileDelete }) {
  const { language } = useContext(LangContext);
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
