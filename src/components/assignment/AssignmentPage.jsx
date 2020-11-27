import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';

import AssignmentApi from '../../api/AssignmentApi';

import CreateAssignment from './CreateAssignment';
import Assignment from './Assignment';


export default function AssignmentPage() {
    const [ assignments, setAssignments ] = useState([]);

    function getAllAssignments() {
        AssignmentApi.getAllAssignments()
            .then((data) => {
                setAssignments(data.data);
                console.log(data);
            })
    }

    useEffect(() => {
        getAllAssignments();
    }, [])
    
    function deleteAssignment(assignmentId) {
        AssignmentApi.deleteAssignment(assignmentId)
            .then(() => {
                getAllAssignments(); // to refresh the list immediately
            })
    }

    return (
        <div className= "assignment-div">
            <CreateAssignment assignments={assignments} getAllAssignments={getAllAssignments}/>

            { assignments.length === 0 ? "No assignment yet" :
                   assignments
                    .map((assignment) => 
                    <Assignment key={uuid()} assignment={assignment} deleteAssignment={deleteAssignment} />
            )}
        </div>
    );

}