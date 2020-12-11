import React from 'react';
import LectureApi from '../../api/LectureApi';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';

export default function Lecture({ getAllLectures, lecture, userRole }) {
  const fileType = fileTypeImageFA(lecture.type);

  function deleteLecture(lectureId) {
    LectureApi.deleteLecture(lectureId).then(() => {
      alert('Lecture Deleted!');
      getAllLectures();
    });
  }

  return (
    <div className="lecture-cards">
      <div className="card-body card-body-lecture">
        <i className={`fas ${fileType} file-type-icons`} />
        <span>
          <a className="file-link" target="_blank" rel="noreferrer" href={lecture.link}>
            {lecture.fileName}
          </a>
        </span>

        {userRole !== 'teacher' ? null : (
          <i
            className="fas fa-trash lecture-delete"
            onClick={() => deleteLecture(lecture.id)}></i>
        )}
      </div>
    </div>
  );
}
