import React from 'react';
import '../../css/lecture/lecture.css';

export default function Lecture({lecture, deleteLecture, user_role}) {

    return (
        
        <div className="card lecture-card">
            <div className="card-body">
                <span>
                    <a href= {lecture.link}
                    className=""
                    target ="_blank">{lecture.title}</a>
                </span>
                {  user_role !== "teacher" ? null : 
                <button className="btn btn-light"
                onClick={() => deleteLecture(lecture.id)}>
                Delete
            </button>
            }
            </div>
        </div>
       
        );

}