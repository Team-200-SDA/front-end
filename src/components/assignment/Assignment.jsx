import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/assignment/assignment.css';

export default function Assignment({ user, assignment, deleteAssignment}) {
    
    const user_ = window.sessionStorage.getItem('user');
    console.log(assignment);
    return (
        
        <div className="card assignment-card">
            <div className="card-body">
            {user_ !== assignment.user.name && assignment.user.role !== "teacher"
                ?(<span className="user-name">
                    {assignment.user.name}:</span>
                ): null}
                <span>
                    <Link to= {assignment.link}
                    className="assignment-link"
                    target ="_blank">{assignment.title}</Link>
                </span>
                {user_ === assignment.user.name ?
                (<button className="btn btn-light"
                    onClick={() => deleteAssignment(assignment.id)}>
                    <i className="fas fa-trash"></i>
                 </button>)
                : null }
                
            </div>
        </div>
       
        );

}
