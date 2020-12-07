import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import LectureApi from '../../api/LectureApi';
import UserAPi from '../../api/UserApi';
import CreateSubject from '../subject/CreateSubject';
import CreateLecture from './CreateLecture';
import Lecture from './Lecture';

export default function LecturePage() {
  const [lectures, setLectures] = useState([]);
  const [user, setUser] = useState({});

  function getAllLectures() {
    LectureApi.getAllLectures().then(data => {
      setLectures(data.data);
    });
  }

  function getUserRole() {
    UserAPi.getLoggedInUser().then(data => {
      setUser(data.data);
    });
  }

  useEffect(() => {
    getAllLectures();
    getUserRole();
  }, []);

  return (
    <div className="lecture-div">
      {/* Loads Subject Creation component based on user role */}
      {user.role !== 'teacher' ? null : <CreateSubject />}

      {/* Loads Lecture Creation component based on user role */}
      {user.role !== 'teacher' ? null : (
        <CreateLecture lectures={lectures} getAllLectures={getAllLectures} />
      )}
      {lectures.map(lecture => (
        <Lecture
          key={uuid()}
          lecture={lecture}
          getAllLectures={getAllLectures}
          user_role={user.role}
        />
      ))}
    </div>
  );
}
