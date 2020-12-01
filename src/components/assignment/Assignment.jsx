import React from 'react';
import '../../css/assignment/assignment.css';

export default function Assignment({ assignment, deleteAssignment }) {
  return (
    <div className="card assignment-card">
      <div className="card-body">
        <span>
          <a href={assignment.link} className="assignment-link" target="#">
            {assignment.title}
          </a>
        </span>
        <button className="btn btn-light" onClick={() => deleteAssignment(assignment.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
