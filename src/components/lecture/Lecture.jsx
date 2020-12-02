import React from 'react';
import '../../css/lecture/lecture.css';

export default function Lecture({lecture, deleteLecture, user_role}) {

    return (
        
        <div className="card lecture-card">
            <div className="card-body">
                <span>
                    <link to= {lecture.link}
                    className=""
                    target ="_blank">{lecture.title}</link>
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