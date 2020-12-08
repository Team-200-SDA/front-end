import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentApi from '../../api/AssignmentApi';
import CreateAssignmentStudent from './CreateAssignmentStudent';
import CreateAssignmentTeacher from './CreateAssignmentTeacher';
import Assignment from './Assignment';

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [allStudentsAssignments, setAllStudentsAssignments] = useState([]);
  const [assignmentAssignedOn, setAssignmentAssignedOn] = useState(true);
  const [assignmentSubmittedOn, setAssignmentSubmittedOn] = useState(false);
  const user_role = window.sessionStorage.getItem('role');

  // Assign
  const handleAssignAssignment = () => {
    setAssignmentAssignedOn(true);
    setAssignmentSubmittedOn(false);
    getTeacherAssignments();
  };

  // Submit
  const handleSubmitAssignment = () => {
    setAssignmentAssignedOn(false);
    setAssignmentSubmittedOn(true);
    getAllAssignments();
    getAllStudentAssignments();
  };

  // Get all Assignments for logged in Student
  function getAllAssignments() {
    AssignmentApi.getAllAssignments().then(data => {
      setAssignments(data.data);
    });
  }

  // Get all Teacher Assignments
  function getTeacherAssignments() {
    AssignmentApi.getTeacherAssignments().then(data => {
      setTeacherAssignments(data.data);
    });
  }

  // Get all Student Assignments
  function getAllStudentAssignments() {
    AssignmentApi.getAllStudentAssignments().then(data => {
      setAllStudentsAssignments(data.data);
    });
  }

  function deleteAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      alert('Assignment Deleted');
      getAllAssignments();
      getTeacherAssignments();
    });
  }

  useEffect(() => {
    getTeacherAssignments();
  }, []);

  return (
    // Assign Assignments and Submit Assignment Buttons
    <div className="assignment-page">
      <div
        className="container d-flex justify-content-around mb-4 btn-group btn-group-toggle"
        data-toggle="buttons">
        <label className="btn btn-secondary active">
          <input type="radio" autoComplete="off" onClick={handleAssignAssignment} />{' '}
          Assigned Assignments
        </label>
        <label className="btn btn-secondary">
          <input type="radio" autoComplete="off" onClick={handleSubmitAssignment} />{' '}
          Submitted Assignments
        </label>
      </div>

      {/* If Logged in as a teacher and on Assignment tab, render  
          Assignment Uploader */}
      {assignmentAssignedOn && (
        <div className="assignment-div">
          {user_role === 'teacher' ? (
            <CreateAssignmentTeacher getTeacherAssignments={getTeacherAssignments} />
          ) : null}

          {/* If on Assignment tab, render all assignments 
              already made by teacher */}
          {teacherAssignments.map(assignment => (
            <Assignment
              key={uuid()}
              assignment={assignment}
              deleteAssignment={deleteAssignment}
            />
          ))}
        </div>
      )}

      {/* If Logged in as a student, and on submissions tab, 
          render Submission Uploader. */}
      {assignmentSubmittedOn && (
        <div className="assignment-div">
          {user_role === 'student' ? (
            <CreateAssignmentStudent
              getAllAssignments={getAllAssignments}
              teacherAssignments={teacherAssignments}
              assignments={assignments}
            />
          ) : null}

          {/* If on submission tab and logged in as student
              render already submitted assignments, If teacher,
              render assignments by all students */}
          {user_role === 'student'
            ? assignments.map(assignment => (
                <Assignment
                  key={uuid()}
                  assignment={assignment}
                  deleteAssignment={deleteAssignment}
                />
              ))
            : allStudentsAssignments.map(assignment => (
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
