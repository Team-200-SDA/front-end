import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentApi from '../../api/AssignmentApi';
import CreateAssignmentStudent from './CreateAssignmentStudent';
import CreateAssignmentTeacher from './CreateAssignmentTeacher';
import Assignment from './Assignment';

import { LangContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

export default function AssignmentPage() {
  const { language } = useContext(LangContext);
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
      alert(language.Assignment_Deleted);
      getAllAssignments();
      getTeacherAssignments();
    });
  }

  useEffect(() => {
    getTeacherAssignments();
  }, []);

  return (
    // Assign Assignments and Submit Assignment Buttons
    <div className="public-chat-wrap">
      <div className="public-chat-title-div">
        <h1 className="public-chat-title">
        <i class="fas fa-clipboard title-icon" />
          Assignments
        </h1>
      </div>
    <div className="assignment-page">
      <div
        className="container d-flex justify-content-around mb-4 btn-group btn-group-toggle"
        data-toggle="buttons">
        <label className="btn btn-secondary active">
          <input type="radio" autoComplete="off" onClick={handleAssignAssignment} />{' '}
          {language.Assigned_Assignments}
        </label>
        <label className="btn btn-secondary">
          <input type="radio" autoComplete="off" onClick={handleSubmitAssignment} />{' '}
          {language.Submitted_Assignments}
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
    </div>
  );
}
