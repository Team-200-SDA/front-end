import React from 'react';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';
import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

export default function Assignment({ assignment, deleteAssignment }) {
  const { language } = useContext(LangContext);
  const user_ = window.sessionStorage.getItem('user');

  const fileType = fileTypeImageFA(assignment.type);

  return (

    <div className="assignment-cards">

      <div className="card-body card-body-assignment">
        <i className={`fas ${fileType} file-type-icons`} />
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={assignment.link}>
            {assignment.fileName}
          </a>
        </span>
        
        {/* Show Student name if logged in as Teacher */}
        {user_ !== assignment.user.name && assignment.user.role !== 'teacher' ? (
          <span className="assignment-user-name">{assignment.user.name}</span> // Space Between assignment and username
        ) : null}

        {/* Delete Button if logged in user is assignment author */}
        {user_ === assignment.user.name ? (
          <i className="fas fa-trash assignment-delete" onClick={() => deleteAssignment(assignment.id)}></i>
          ) : null}

      </div>
    </div>
  );
}
