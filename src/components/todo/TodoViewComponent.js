import React, { Component } from 'react';

function StudentViewComponent() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h4>Todo- Information</h4>
        </div>
        <div className="card-body">
          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Id:</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.studentId}</span>
            </div>
          </div>

          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Task Name:</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.name}</span>
            </div>
          </div>

          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Email:</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.email}</span>
            </div>
          </div>

          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Task id</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.taskcount}</span>
            </div>
          </div>

          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Phone:</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.telephone}</span>
            </div>
          </div>

          <div className="d-md-flex flex-row mb-3">
            <div className="col-sm-2 bg-light shadow-sm">
              <span>Register Date:</span>
            </div>
            <div className="col-sm-10 bg-light shadow-sm">
              <span>{this.state.student.regDate}</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <a href="/" className="btn btn-danger">
            Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default StudentViewComponent;
