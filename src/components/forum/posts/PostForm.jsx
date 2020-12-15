import React, { useState } from "react";
import { useContext } from "react";
import { LangContext } from "../../../contexts/LanguageContext";

import { Button } from "@material-ui/core";

function PostForm({
  initialTitle,
  initialBody,
  onSubmit,
  onCancel,
  formTitle,
}) {
  // props come from Post
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState(initialTitle || "");
  const [body, setBody] = useState(initialBody || "");

  /**
   * @param {*} e
   * preventDefault takes current event as parameter and prevents the page from refreshing.
   * Creates new post.
   * Catches exception and displays error message.
   */
  const onCreatePostClick = (e) => {
    e.preventDefault();
    const postData = { title, body };
    onSubmit(postData).catch((err) => {
      alert(language.error_occured);
    });
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
      <h4 className="card-title">{formTitle || "Create a post"}</h4>
        <form onSubmit={onCreatePostClick}>
          <div className="form-group">
            <label>{language.title}</label>
            <input
              type="text"
              className="form-control"
              placeholder={language.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>{language.Body}</label>
            <textarea
              className="form-control"
              placeholder={language.Post_Body}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="form-create-button">
            <Button
              type="button"
              color="primary"
              variant="contained"
              data-toggle="modal"
              data-target="#myModal"
              type="submit"
            >
              {language.Save}
            </Button>

            <Button
              type="button"
              color="primary"
              variant="contained"
              data-toggle="modal"
              data-target="#myModal"
              type="button"
              onClick={onCancel}
            >
              {language.Cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
