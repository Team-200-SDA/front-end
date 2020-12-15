/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SubjectApi from '../../api/SubjectApi';
import CreateSubject from './CreateSubject';
import Subject from './Subject';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

function SubjectsPage() {
  const { language } = useContext(LangContext);
  const [subjects, setSubjects] = useState([]);
  const userRole = window.sessionStorage.getItem('role');

  /**
   * Get a list of subjects from the backend.
   */
  const getSubjects = async () => {
    const response = await SubjectApi.getAll();
    setSubjects(response.data);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  /**
   * Create an array of Subject components to render to the screen based on the array
   * from the API call done in the use Effect.
   */
  const jsxSubjects = subjects.map(subject => {
    return (
      <Subject
        key={uuid()}
        subject={subject}
        getSubjects={getSubjects}
        userRole={userRole}
      />
    );
  });

  return (
    <div className="subject-page-wrap">
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-book-open title-icon" />
          {language.Subjects}
        </h1>
      </div>

      <div className="">
        {/* Loads Lecture Creation component based on user role */}
        {userRole !== 'teacher' ? null : <CreateSubject getSubjects={getSubjects} />}
        <div className="subject-page-cards">{jsxSubjects}</div>
      </div>
    </div>
  );
}

export default SubjectsPage;
