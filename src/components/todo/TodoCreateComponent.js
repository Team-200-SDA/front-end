import { SignalCellularNull, SignalCellularNullOutlined } from '@material-ui/icons';
import React, { Component } from 'react';

function StudentCreateComponent() {
  /*
  saveStudentSubmit = e => {
    e.preventDefault();
    // invoke validation function
    const isValid = this.handleValidation();
    if (isValid) {
      alert('Register Form is submited');
      // invoke api
      let student = this.state.student;
      StudentService.createStudent(student).then(res => {
        console.log('res: ', res.data);
        if (res.status === '201') {
          this.props.history.push('/student-list');
        } else {
          this.setState({ apiError: res.data.message });
        }
      });
    
    */

  console.log('############# TEST SAVE FUNCTION ##############');

  //   handleChange = e => {
  //     const variableId = e.target.id;
  //     const value = e.target.value;
  //     //array operator which takes individual elements
  //     const student = { student: { ...this.state.student, [variableId]: value } };
  //     console.log('student :>> ', student);
  //     this.setState(student);
  //   };

  /* handleValidation = () => {
    let std = this.state.student;
    let errors = {};
    let formIsValid = true;

    // name validation
    if (std.name.length === 0) {
      formIsValid = false;
      errors.name = 'Name is rquired';
    }

    // email validation
    if (std.email.length === 0) {
      formIsValid = false;
      errors.email = 'Email is required';
    }

    //age validation
    if (std.taskcount <= 0) {
      formIsValid = false;
      errors.taskcount = 'Taskcount is required';
    }

    //phone
    if (std.telephone.length === 0) {
      formIsValid = false;
      errors.telephone = 'Phone is required';
    }

    this.setState({ errors });
    return formIsValid;
  }; */

  return (
    <div className="container">
      <form onSubmit={null}>
        <div className="card">
          <div className="card-header bg-secondary text-white">
            <h4>Student Form</h4>
            <span style={{ color: 'red' }}>{null}</span>
          </div>

          <div className="card-body">
            <label>Name:</label>
            <input
              type="text"
              value={null}
              onChange={null}
              className="form-control"
              placeholder="Enter  Task Name"
              id="name"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />

            <label>Email:</label>
            <input
              type="text"
              value={null}
              onChange={null}
              className="form-control"
              placeholder="Enter Email"
              id="email"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />

            <label>Taskcount:</label>
            <input
              type="text"
              value={null}
              onChange={null}
              className="form-control"
              placeholder="Enter task count"
              id="taskcount"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />

            <label>Phone:</label>
            <input
              type="text"
              value={null}
              onChange={null}
              className="form-control"
              placeholder="Enter Phone Number"
              id="telephone"
            />
            <span style={{ color: 'red' }}>{null}</span>
            <br />
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentCreateComponent;
