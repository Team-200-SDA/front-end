import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TodoApi from "../../api/TodoApi";
import { useContext } from "react";
import { LangContext } from "../../contexts/LanguageContext";

import { Button } from "@material-ui/core";

//styling
import "../../css/todo/_todo.css";

//Using Functional components to Create a student todo list.
function StudentCreateComponent() {
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const history = useHistory();

  //Creation of the Todolist
  const createTodo = async (event) => {
    event.preventDefault();
    const todo = { title, description, dueDate, complete: false };
    await TodoApi.createTodo(todo);
    history.push("/todo-list");
  };

  return (
    // <div
    //   className="container d-flex justify-content-around mb-4 btn-group btn-group-toggle"
    //   data-toggle="buttons"
    // >
      <form onSubmit={(event) => createTodo(event)}>
        <div className="card-body">
          <h4>{language.Create_Todo}</h4>
          <label>{language.Title}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder={language.Enter_Title}
          />
          <span style={{ color: "red" }}>{null}</span>
          <br />

          <label>{language.Description}</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder={language.Enter_Description}
          />
          <span style={{ color: "red" }}>{null}</span>
          <br />

          <label>{language.Due_Date}</label>
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            placeholder={language.Enter_due_date}
          />
          <span style={{ color: "red" }}>{null}</span>
          <br />

          <Button type="submit" variant="contained" color="primary">
            {language.Save}
          </Button>
        </div>
      </form>
    // </div>
  );
}

export default StudentCreateComponent;
