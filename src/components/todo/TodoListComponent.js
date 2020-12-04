import { SignalCellularNullSharp } from '@material-ui/icons';
import React, { Component } from 'react';

function StudentListComponent() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h4>Student List</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Task count</td>
                <td>Phone</td>
                <td>Date</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody>
              {this.state.students.map(student => (
                <tr key={student.studentId}>
                  <td>{null}</td>
                  {/* //student.name */}
                  <td>{null}</td>
                  <td>{null}</td>
                  <td>{null}</td>student.telephone
                  <td>{null}</td>student.regDate
                  <td>
                    <button type="submit" onClick={null} className="btn btn-info">
                      Details
                    </button>
                  </td>
                  <td>
                    <input name={null} type="checkbox" checked={null} onChange={null} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <a href="/" className="btn btn-danger">
            Back
          </a>
          <button type="submit" onClick className="btn btn-info">
            Delete the task
          </button>
          <button type="submit" onClick className="btn btn-info">
            Mark the task as complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentListComponent;
