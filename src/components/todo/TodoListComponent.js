import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import TodoApi from "../../api/TodoApi";
import { useContext } from "react";
import { LangContext } from "../../contexts/LanguageContext";
import { Button } from "@material-ui/core";

function TodoListComponent() {
  const { language } = useContext(LangContext);
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(0);

  //React.useEffect hook takes a function as an argument and it will call that function after the main render cycle has completed

  useEffect(() => {
    const getTodos = async () => {
      const response = await TodoApi.getTodos();
      setTodos(responseSorter(response.data));
    };
    getTodos();
  }, [update]);

  //Sorting the tasks

  const responseSorter = (response) => {
    return response.sort((a, b) =>
      a.complete > b.complete ? -1 : a.complete < b.complete ? 1 : 0
    );
  };

  //Updating of the taks

  const updateComplete = async (todo) => {
    await TodoApi.updateTodo({ ...todo, complete: !todo.complete });
    setUpdate((value) => value + 1);
  };

  const deleteTodo = async (id) => {
    console.log(id);

    await TodoApi.deleteTodo(id);
    setUpdate((value) => value + 1);
  };

  //Calling the functions ...

  const jsxTodos = todos.map((todo) => {
    return (
      <tr key={uuid()}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.dueDate}</td>
        <td>{todo.complete ? <i className="fas fa-check" /> : null}</td>
        <td>
          <button
            type="submit"
            onClick={() => deleteTodo(todo.id)}
            className="btn btn-info"
          >
            <i className="fas fa-trash-alt" />
          </button>
        </td>

        <td>
          <button
            type="submit"
            onClick={() => updateComplete(todo)}
            className="btn btn-info"
          >
            <i className="fas fa-clipboard-check"></i>
          </button>
        </td>
      </tr>
    );
  });

  //Using a table to display the list of the tasks in a table format.
  return (
    <div className="ToDoList-Page-Wrap">
      <div className="title-div">
        <div className="page-title-text">
          <h1>
            <i className="fas fa-tasks mr-3" />
            {language.Todo_List}
          </h1>
        </div>
      </div>

      <div className="card-body-todo create-assignment-div">
        <div className="container d-flex justify-content-around btn-group btn-group-toggle">
          <table className="table mt-3 mb-2 table-striped table-bordered">
            <thead>
              <tr>
                <td>{language.Title}</td>
                <td>{language.Description}</td>
                <td>{language.Due_Date}</td>
                <td>{language.Status}</td>
                <td>{language.Delete}</td>
                <td>{language.Mark_Complete}</td>
              </tr>
            </thead>
            <tbody>{jsxTodos}</tbody>
          </table>
        </div>
          <Link to="/todo-form" className="btn info">
            <Button
            variant="contained"
            color="primary">
            {language.Create}
            </Button>
          </Link>
        
      </div>
    </div>
  );
}

export default TodoListComponent;
