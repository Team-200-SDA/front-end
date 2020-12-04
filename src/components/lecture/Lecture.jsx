import React from 'react';
import { Link } from 'react-router-dom';

export default function Lecture({lecture, deleteLecture, user_role}) {

    return (
        
        <div className="card lecture-card">
            <div className="card-body">
                <span>
                    <a target="_blank" rel="noreferrer" href={lecture.link}
                    to= {lecture.link}>
                    {lecture.title}
                    </a>

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
