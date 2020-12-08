import React from 'react';
import LectureApi from '../../api/LectureApi';
import fileTypeImage from '../../js/functions/fileUpload/fileTypeImage';

export default function Lecture({ getAllLectures, lecture, user_role }) {
  function deleteLecture(lectureId) {
    LectureApi.deleteLecture(lectureId).then(() => {
      alert('Lecture Deleted!');
      getAllLectures();
    });
  }

  return (
    <div className="card card-filestorage">
      <div className="card-body-filestorage">
        <img className="file-type" src={fileTypeImage(lecture.type)} alt="" />
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={lecture.link}>
            {lecture.fileName}
          </a>
        </span>

        {/* Delete Button if logged in user is a teacher */}
        {user_role !== 'teacher' ? (
          <button
            className="btn btn-danger file-delete"
            onClick={() => deleteLecture(lecture.id)}>
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
