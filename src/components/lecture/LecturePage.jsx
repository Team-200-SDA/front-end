/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LectureApi from '../../api/LectureApi';
import CreateLecture from './CreateLecture';
import Lecture from './Lecture';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';

export default function LecturePage() {
  // const subjects = useRecoilValue(subjectsState);
  const { language } = useContext(LangContext);
  const urlParams = useParams();
  const [lectures, setLectures] = useState([]);
  const userRole = window.sessionStorage.getItem('role');

  /**
   * Asynchronous API Call: Get all lectures created by teachers by
   * subjectId
   */
  const getLectures = async () => {
    try {
      const response = await LectureApi.getAllLecturesBySubjectId(urlParams.id);
      setLectures(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLectures();
  }, []);

  return (
    <div className="lecture-page-wrap">
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-book-open title-icon" />
          {language.Lectures}
        </h1>
      </div>

      <div className="">
        {/* Loads Lecture Creation component based on user role */}
        {userRole !== 'teacher' ? null : (
          <CreateLecture
            lectures={lectures}
            getAllLectures={getLectures}
            urlParams={urlParams}
          />
        )}
        <div className="lecture-page-cards">
          {lectures.map(lecture => (
            <Lecture
              key={uuid()}
              getAllLectures={getLectures}
              lecture={lecture}
              userRole={userRole}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
