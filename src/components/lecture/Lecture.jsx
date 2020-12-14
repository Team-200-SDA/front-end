import React from 'react';
import LectureApi from '../../api/LectureApi';
import fileTypeImageFA from '../../js/functions/fileUpload/fileTypeImageFA';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

export default function Lecture({ getAllLectures, lecture, userRole }) {
  const { language } = useContext(LangContext);
  const fileType = fileTypeImageFA(lecture.type);

  /**
   * @param {Long} lectureId
   * Delete a specific lectureId by id and then update the component by doing API
   * calls to get the updated list of lectures.
   */

  function deleteLecture(lectureId) {
    LectureApi.deleteLecture(lectureId).then(() => {
      alert(language.Lecture_Deleted);
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
