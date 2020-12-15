import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoApi from '../../api/TodoApi';
import { useContext } from 'react';
import { LangContext } from '../../js/states/LanguageContext';
import Calendar from 'react-calendar';

import { Button, FormLabel } from '@material-ui/core';
import { format } from 'date-fns';

/*   Using Functional components to Create a student todo list.*/
function StudentCreateComponent() {
  /* Context is primarily used when some data needs to be accessible 
  by many components at different nesting levels.  */

  const { language } = useContext(LangContext);

  //Setting the variables title,description,dueDate

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useHistory();

  /* Creation of the Todolist using async and await events.
  The async keyword before a function has two effects:
   Makes it always return a promise. Allows await to be used in it.Fetching the data using hooks. */
  const createTodo = async event => {
    event.preventDefault();

    const todo = { title, description, dueDate, complete: false };
    await TodoApi.createTodo(todo);
    history.push('/todo-list');
  };

  /**
   * Set default state as today. Doing this in useState causes an error.
   */
  useEffect(() => {
    setDueDate(oldDate => format(new Date(), 'dd-MMM-yyyy'));
  }, []);

  return (
    //Fetching data using JSX ...
    <>
      <div className="title-div">
        <h1 className="page-title-text">
          <i className="fas fa-tasks title-icon"></i>
          {language.Todo_List}
        </h1>
      </div>

      <div className="card-body create-todo-card">
        <form onSubmit={event => createTodo(event)}>
          <div className="creation-form create-todo-label">
            {language.Create_new_Todo}
          </div>
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

          <FormLabel component="legend">{language.Due_Date}</FormLabel>
          <Calendar
            onChange={(value, event) => setDueDate(format(value, 'dd-MMM-yyyy'))}
          />

          <Button
            className="create-todo-button"
            type="submit"
            variant="contained"
            color="primary">
            {language.Create_Todo}
          </Button>
        </form>
      </div>
    </>
  );
}

export default StudentCreateComponent;
