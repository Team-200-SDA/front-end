import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LectureApi from '../../api/LectureApi';
import CreateLecture from './CreateLecture';
import Lecture from './Lecture';
import Logo from '../../assets/images/logo.png';

export default function LecturePage() {
  // const subjects = useRecoilValue(subjectsState);
  const urlParams = useParams();
  const [lectures, setLectures] = useState([]);
  const userRole = window.sessionStorage.getItem('role');

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
        <i class="fas fa-book-open title-icon" />
            Lectures
        </h1>
      </div>
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
          <Lecture key={uuid()} getAllLectures={getLectures} lecture={lecture} userRole={userRole} /> 
      ))}
      </div>
    </div>
  );
}
