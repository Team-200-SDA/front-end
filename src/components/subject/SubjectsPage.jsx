import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import SubjectApi from '../../api/SubjectApi';
import CreateSubject from './CreateSubject';
import Subject from './Subject';

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    const response = await SubjectApi.getAll();
    setSubjects(response.data);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    console.log(subjects);
  }, [subjects]);

  const jsxSubjects = subjects.map(subject => {
    return <Subject key={uuid()} subject={subject} getSubjects={getSubjects} />;
  });

  return (
    <>
      <CreateSubject getSubjects={getSubjects} />
      <div className="subject-page-cards">{jsxSubjects}</div>
    </>
  );
}

export default SubjectsPage;
