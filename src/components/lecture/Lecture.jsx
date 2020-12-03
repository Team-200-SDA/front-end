import React from 'react';
import { Link } from 'react-router-dom';

export default function Lecture({lecture, deleteLecture, user_role}) {

    return (
        
        <div className="card lecture-card">
            <div className="card-body">
                <span>
                    <Link to= {lecture.link}
                    className=""
                    target ="_blank">{lecture.title}</Link>
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
