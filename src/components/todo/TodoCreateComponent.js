import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoApi from '../../api/TodoApi';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LanguageContext';

import { Button, FormLabel } from '@material-ui/core';

//Using Functional components to Create a student todo list.
function StudentCreateComponent() {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useHistory();

  //Creation of the Todolist
  const createTodo = async event => {
    event.preventDefault();
    const todo = { title, description, dueDate, complete: false };
    await TodoApi.createTodo(todo);
    history.push('/todo-list');
  };

  return (
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-tasks title-icon"></i>
          {language.Todo_List}
        </h1>
      </div>

      <div className="card-body create-todo-card">
        <form onSubmit={event => createTodo(event)}>
          <div className="creation-form create-todo-label">Create a new Todo</div>
          <FormLabel className="form-label" component="legend">
            {language.Title}
          </FormLabel>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control subject-input"
            placeholder={language.Enter_Title}
          />
          <FormLabel className="form-label" component="legend">
            {language.Description}
          </FormLabel>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-control subject-input"
            placeholder={language.Enter_Description}
          />
          <FormLabel className="form-label" component="legend">
            {language.Due_Date}
          </FormLabel>
          <input
            type="text"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="form-control subject-input last-input-todo"
            placeholder={language.Enter_due_date}
          />

          <Button
            className="create-todo-button"
            type="submit"
            variant="contained"
            color="primary">
            {/* Change from Save to Create Todo */}
            Create Todo
          </Button>
        </form>
      </div>
    </>
  );
}

export default StudentCreateComponent;
