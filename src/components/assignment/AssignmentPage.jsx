import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AssignmentApi from '../../api/AssignmentApi';

import CreateAssignment from './CreateAssignment';
import Assignment from './Assignment';

import '../../css/assignment/assignmentPage.css';

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);

  const [assignmentAssignedOn, setAssignmentAssignedOn] = useState(true);
  const [assignmentSubmittedOn, setAssignmentSubmittedOn] = useState(false);

  const handleAssignAssignment = () => {
    setAssignmentAssignedOn(!assignmentAssignedOn);
    setAssignmentSubmittedOn(false);
  };
  const handleSubmitAssignment = () => {
    setAssignmentAssignedOn(false);
    setAssignmentSubmittedOn(!assignmentSubmittedOn);
  };

  function getAllAssignments() {
    AssignmentApi.getAllAssignments().then(data => {
      setAssignments(data.data);
      console.log(data);
    });
  }

  useEffect(() => {
    getAllAssignments();
  }, []);

  function deleteAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      getAllAssignments(); // to refresh the list immediately
    });
  }

  return (
    <div className="assignment-page">
      <div
        className="container d-flex justify-content-around mb-4 btn-group btn-group-toggle"
        data-toggle="buttons">
        <label className="btn btn-secondary active">
          <input
            type="radio"
            name="options"
            id="option1"
            autoComplete="off"
            onClick={handleAssignAssignment}
          />{' '}
          Assigned Assignments
        </label>
        <label className="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autoComplete="off"
            onClick={handleSubmitAssignment}
          />{' '}
          Submitted Assignments
        </label>
      </div>

      {assignmentAssignedOn && (
        <div className="assignment-div">
          <CreateAssignment
            assignments={assignments}
            getAllAssignments={getAllAssignments}
          />

          {assignments.length === 0
            ? 'No assignment yet.'
            : assignments.map(assignment => (
                <Assignment
                  key={uuid()}
                  assignment={assignment}
                  deleteAssignment={deleteAssignment}
                />
              ))}
        </div>
      )}
      {assignmentSubmittedOn && (
        <div className="assignment-div">
          <CreateAssignment
            assignments={assignments}
            getAllAssignments={getAllAssignments}
          />

          {assignments.length === 0
            ? 'No assignment yet.'
            : assignments.map(assignment => (
                <Assignment
                  key={uuid()}
                  assignment={assignment}
                  deleteAssignment={deleteAssignment}
                />
              ))}
        </div>
      )}
    </div>
  );
}
