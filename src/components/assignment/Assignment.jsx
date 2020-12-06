import React from 'react';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';

export default function Assignment({ user, assignment, deleteAssignment }) {
  const user_ = window.sessionStorage.getItem('user');
  console.log(assignment);
  return (
    <div className="card card-filestorage">
      <div className="card-body-filestorage">
        {user_ !== assignment.user.name && assignment.user.role !== 'teacher' ? (
          <span className="user-name">{`${assignment.user.name}: `}</span> // Space Between assignment and username
        ) : null}
        <img className="file-type" src={fileTypeImage(assignment.type)} alt="" />
        <span>
          <a
            className="file-link"
            target="_blank"
            rel="noreferrer"
            href={assignment.link}>
            {assignment.fileName}
          </a>
        </span>
        {user_ === assignment.user.name ? (
          <button
            className="btn btn-danger file-delete"
            onClick={() => deleteAssignment(assignment.id)}>
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
