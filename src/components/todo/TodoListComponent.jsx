import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import TodoApi from '../../api/TodoApi';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';
import { Button } from '@material-ui/core';

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

  const responseSorter = response => {
    return response.sort((a, b) =>
      a.complete > b.complete ? -1 : a.complete < b.complete ? 1 : 0
    );
  };

  //Updating of the taks

  const updateComplete = async todo => {
    await TodoApi.updateTodo({ ...todo, complete: !todo.complete });
    setUpdate(value => value + 1);
  };

  const deleteTodo = async id => {
    console.log(id);

    await TodoApi.deleteTodo(id);
    setUpdate(value => value + 1);
  };

  //Calling the functions ...

  const jsxTodos = todos.map(todo => {
    return (
      <tr key={uuid()} className={todo.complete ? 'todo-complete' : null}>
        <th scope="row">{todo.title}</th>
        <td>{todo.description}</td>
        <td>{todo.dueDate}</td>
        <td>
          <i
            onClick={() => updateComplete(todo)}
            className={`${
              todo.complete ? 'far fa-check-circle' : 'far fa-circle'
            } todo-icon`}
          />
        </td>
        <td>
          <i onClick={() => deleteTodo(todo.id)} className="fas fa-trash todo-icon" />
        </td>
      </tr>
    );
  });

  //Using a table to display the list of the tasks in a table format.
  return (
    <div className="ToDoList-Page-Wrap">
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-tasks title-icon"></i>
          {language.Todo_List}
        </h1>
      </div>

      <div className="card-body todo-card">
        {jsxTodos.length === 0 ? null : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">{language.Title}</th>
                <th scope="col">{language.Description}</th>
                <th scope="col">{language.Due_Date}</th>
                <th scope="col">{language.Status}</th>
                <th scope="col">{language.Delete}</th>
              </tr>
            </thead>
            <tbody>{jsxTodos}</tbody>
          </table>
        )}
        <Link to="/todo-form" className="btn info">
          <Button variant="contained" color="primary">
            {language.Create_Todo}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TodoListComponent;
