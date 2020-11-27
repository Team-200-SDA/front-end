import React from 'react';
import '../../css/lecture/lecture.css';

export default function Lecture({lecture, deleteLecture}) {

    return (
        
        <div className="card lecture-card">
            <div className="card-body">
                <span>
                    <a href= {lecture.link}
                    className=""
                    target ="_blank">{lecture.title}</a>
                </span>
                <button className="btn btn-light"
                    onClick={() => deleteLecture(lecture.id)}>
                    Delete<i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
       
        );

}