import React, { Component } from 'react';
import StudentService from '../../services/StudentService';

class TodoList extends Component {

    state = {
       students: [] 
    }

    componentDidMount(){
        // add static data 
        this.setState({
            students: [
                {
                    studentId: 1111,
                    name: "Cooking food..",
                     desc:"Prepare the dish from Hebbars kitchen",
                    regDate: "2020-11-11"
                }
                ,{
                    studentId: 2222,
                    name: "Writing code..",
                    desc:"React JS grroupproject by Novare",
                    regDate: "2020-11-13"
                }
            ]
        });
        // call api
        StudentService.getStudents().then( 
            (res) => {
                    console.log("STUDENT JSON RESULT>>>> : ",res.data);
                    this.setState({students: res.data }); //10000000 numbers will add automatically
            }
        );
    }


    viewStudent(studentId){//10000
        console.log("STUDENT ID >>>>: ", studentId);
        this.props.history.push(`/student-view/${studentId}`);
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-secondary text-white">
                        <h4>Task List</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <td>id</td>
                                    <td>Task Name</td>
                            
            
                                    <td>Description</td>
                                    <td>DueDate</td>
                                    <td> </td>
                                   
                                </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.students.map(
                                    student => 
                                <tr key={student.studentId}>
                                    <td>{student.studentId}</td>

                                    <td>{student.name}</td>
                                   
                                    <td>{student.desc}</td>
                                    <td>{student.regDate}</td>
                                    <td>
                                        <button type="submit" onClick={ () => this.viewStudent() } className="btn btn-info" >Add a new Task</button>
                                        <button type="submit" onClick={ () => this.viewStudent(student.studentId) } className="btn btn-info" >Mark as completed</button>
                                        <button type="submit" onClick={ () => this.viewStudent(student.studentId) } className="btn btn-info" >Update the task</button>


                                    </td>
                                </tr>
                                )
                            
                            }
                            </tbody>

                        </table>
                    </div>
                    <div className="card-footer">
                        <a href="/" className="btn btn-danger">Show the tasks</a>
                    </div>
                </div> 
            </div>
        );
    }
}

export default TodoList;