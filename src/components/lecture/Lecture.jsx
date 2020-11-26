import React, { useState } from 'react';
import LecturePage from './LecturePage';

export default function Lecture({lecture, deleteLecture}) {
    const [bodyIsOpen, setBodyIsOpen] = useState(false);
    const handleOpenMessage = () => {
        setBodyIsOpen(!bodyIsOpen);
    };


    return (
        <div className="card mt-4">
            <div className="card-title bg-secondary text-white m-0 p-1">
                <div className="mw-75" 
                    onClick={handleOpenMessage} 
                    style={{ cursor: "pointer" }}>
                    {lecture.title}
                </div>
            </div>
            <div className="card-body">
                {lecture.link}
            </div>
            <div className="text-right">
                <button className="btn btn-light mr-s"
                onClick={() => deleteLecture(lecture.id)}>
                Delete
                </button>
            </div>
        </div>
    );

}