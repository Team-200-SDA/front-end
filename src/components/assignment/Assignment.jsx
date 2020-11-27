import React from 'react';
import '../../css/assignment/assignment.css';

export default function Assignment({assignment, deleteAssignment}) {

    return (
        
        <div className="card">
            <div className="card-body">
                <span>
                    <a href= {assignment.link}
                    className=""
                    target ="_blank">{assignment.title}</a>
                </span>
                <button className="btn btn-light"
                    onClick={() => deleteAssignment(assignment.id)}>
                    Delete<i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
       
        );

}