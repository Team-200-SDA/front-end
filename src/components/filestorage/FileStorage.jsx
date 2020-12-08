import React from 'react';
import './FileStorage.css';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function FileStorage({ file, onFileDelete }) {
  const { language } = useContext(LangContext);
  return (
    <div className="card card-filestorage">
      <div className="card-body">
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={file.link}>
            {file.fileName}
          </a>
        </span>
        <button className="btn btn-danger" onClick={() => onFileDelete(file.id)}>
          {language.Delete}
        </button>
      </div>
    </div>
  );
}
