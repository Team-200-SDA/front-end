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

  /**
   * Change state to render Assign component and does and api call to get the
   * most up to date teacher assignments
   */
  const handleAssignAssignment = () => {
    setAssignmentAssignedOn(true);
    setAssignmentSubmittedOn(false);
    getTeacherAssignments();
  };

  /**
   * Change state to render submit component and does and api call to get the
   * most up to date submissions of all students
   */
  const handleSubmitAssignment = () => {
    setAssignmentAssignedOn(false);
    setAssignmentSubmittedOn(true);
    getAllAssignments();
    getAllStudentAssignments();
  };

  /**
   * API Call: Get all assignments for a logged in student
   */
  function getAllAssignments() {
    AssignmentApi.getAllAssignments().then(data => {
      setAssignments(data.data);
    });
  }

  /**
   * API Call: Get all assignments created by a teachers
   */
  function getTeacherAssignments() {
    AssignmentApi.getTeacherAssignments().then(data => {
      setTeacherAssignments(data.data);
    });
  }

  /**
   * API Call: If logged in as a teacher, get all the student assignments
   */
  function getAllStudentAssignments() {
    AssignmentApi.getAllStudentAssignments().then(data => {
      setAllStudentsAssignments(data.data);
    });
  }

  /**
   * @param {num} assignmentId
   * Delete a specific assignment by id and then update the component by doing API
   * calls to get the updated list of assignments.
   */
  function deleteAssignment(assignmentId) {
    AssignmentApi.deleteAssignment(assignmentId).then(() => {
      alert(language.Assignment_Deleted);
      getAllAssignments();
      getTeacherAssignments();
    });
  }

  /**
   * When component is rendered, do an API call to get all the assignments created
   * by teachers.
   */
  useEffect(() => {
    getTeacherAssignments();
  }, []);

  return (
    // Assign Assignments and Submit Assignment Buttons
    <div className="assignment-page-wrap">
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-clipboard title-icon" />
          Assignments
        </h1>
      </div>
      <div className="">
        <div
          className="card-body assignment-toggle container d-flex justify-content-around btn-group btn-group-toggle"
          data-toggle="buttons">
          <label className="btn btn-secondary checked active">
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
          <div className="assignment-page-cards">
            {user_role === 'teacher' ? (
              <CreateAssignmentTeacher getTeacherAssignments={getTeacherAssignments} />
            ) : null}

            {/* If on Assignment tab, render all assignments 
              already made by teacher */}
            <div className="assignment-page-cards">
              {teacherAssignments.map(assignment => (
                <Assignment
                  key={uuid()}
                  assignment={assignment}
                  deleteAssignment={deleteAssignment}
                />
              ))}
            </div>
          </div>
        )}

        {/* If Logged in as a student, and on submissions tab, 
          render Submission Uploader. */}
        {assignmentSubmittedOn && (
          <div className="assignment-page-cards">
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
            <div className="assignment-page-cards">
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
          </div>
        )}
      </div>
    </div>
  );
}
