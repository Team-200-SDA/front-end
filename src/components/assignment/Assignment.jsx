import React from 'react';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';

export default function Assignment({ assignment, deleteAssignment }) {
  const user_ = window.sessionStorage.getItem('user');
  const role_ = window.sessionStorage.getItem('role');

  const fileType = fileTypeImageFA(assignment.type);

  return (
    <div className="card-body assignment-cards">
      <div className="card-body-assignment">
        <i className={`fas ${fileType} file-type-icons`} />
        <span>
          <a
            className="file-link"
            target="_blank"
            rel="noreferrer"
            href={assignment.link}>
            {assignment.fileName}
          </a>
        </span>

        <span className="due-date">
          <i className="fas fa-calendar-check" /> {assignment.dueDate}
        </span>

        {/* Show Student name if logged in as Teacher */}
        {user_ !== assignment.user.name && assignment.user.role !== 'teacher' ? (
          <span className="assignment-user-name">{assignment.user.name}</span> // Space Between assignment and username
        ) : null}

        {/* Delete Button if logged in user is assignment author */}
        {role_ === assignment.user.role ? (
          <i
            className="fas fa-trash assignment-delete"
            onClick={() => deleteAssignment(assignment.id)}></i>
        ) : null}
      </div>
    </div>
  );
}
