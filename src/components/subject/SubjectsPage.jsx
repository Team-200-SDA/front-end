/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SubjectApi from '../../api/SubjectApi';
import CreateSubject from './CreateSubject';
import Subject from './Subject';
import Logo from '../../assets/images/logo.png';

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const userRole = window.sessionStorage.getItem('role');

  const getSubjects = async () => {
    const response = await SubjectApi.getAll();
    setSubjects(response.data);
  };

  useEffect(() => {
    getSubjects();
  }, []);

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
    <>
      <div className="subject-div card-body">
        <div className="subject-title-div">
          <h1 className="subject-title">Lectures</h1>
          <img className="app-logo" src={Logo} alt="" />
        </div>
      
      {/* Loads Lecture Creation component based on user role */}
      {userRole !== 'teacher' ? null : <CreateSubject getSubjects={getSubjects} />}
      <div className="subject-page-cards">
        {jsxSubjects}
      </div>
      </div>
    </>
  );
}

export default SubjectsPage;
