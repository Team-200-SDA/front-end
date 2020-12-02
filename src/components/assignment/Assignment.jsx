import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/assignment/assignment.css';

export default function Assignment({ user, assignment, deleteAssignment}) {
    
    const user_ = window.sessionStorage.getItem('user');

    return (
        
        <div className="card assignment-card">
            <div className="card-body">
                <span>
                    <Link to= {assignment.link}
                    className="assignment-link"
                    target ="_blank">{assignment.title}</Link>
                </span>
                {user_ === assignment.user.name ?
                (<button className="btn btn-light"
                    onClick={() => deleteAssignment(assignment.id)}>
                    Delete
                 </button>)
                : null }
                
            </div>
        </div>
       
        );

}