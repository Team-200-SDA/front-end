import React, { Component } from 'react';
import StudentService from '../../services/StudentService';

class TodoView extends Component {

    state={
        studentId: this.props.match.params.studentId,
        student: {}
    }

    componentDidMount(){
        // static data
        //If we want to pass the static data we can pass it here...
        // call api
        StudentService.getStudentById(this.state.studentId).then(
            (res)=>{
                this.setState({student: res.data});
            }
        );
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4>Class To-do Information</h4>
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
                                <span>Description steps for the task:</span>
                            </div>
                            <div className="col-sm-10 bg-light shadow-sm">
                                <span>{this.state.student.desc}</span>
                            </div>
                        </div>

                        <div className="d-md-flex flex-row mb-3">
                            <div className="col-sm-2 bg-light shadow-sm">
                                <span>Due Date:</span>
                            </div>
                            <div className="col-sm-10 bg-light shadow-sm">
                                <span>{this.state.student.regDate}</span>
                            </div>
                        </div>
                       
                    </div>
                    <div className="card-footer">
                        <a href="/" className="btn btn-danger">View the details</a>
                   

                    </div>
                </div>
            </div>
        );
    }
}

export default TodoView;
