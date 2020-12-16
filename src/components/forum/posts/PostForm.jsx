import React, { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../js/states/LanguageContext';

import { Button } from '@material-ui/core';

function PostForm({ initialTitle, initialBody, onSubmit, onCancel, formTitle }) {
  // props come from Post
  const { language } = useContext(LangContext);
  const [title, setTitle] = useState(initialTitle || '');
  const [body, setBody] = useState(initialBody || '');

  /**
   * @param {*} e
   * preventDefault takes current event as parameter and prevents the page from refreshing.
   * Creates new post.
   * Catches exception and displays error message.
   */
  const onCreatePostClick = e => {
    e.preventDefault();
    const postData = { title, body };
    onSubmit(postData).catch(err => {
      alert(language.error_occured);
    });
  };

  return (
    <div className="card-body post">
      <h4 className="card-title">{formTitle || 'Create a post'}</h4>
      <form onSubmit={onCreatePostClick}>
        <div className="form-group">
          <label>{language.title}</label>
          <input
            type="text"
            className="form-control subject-input"
            placeholder={language.title}
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{language.Body}</label>
          <textarea
            className="form-control subject-input"
            placeholder={language.Post_Body}
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          />
        </div>

        <div className="form-create-button">
          <Button
            type="button"
            color="primary"
            variant="contained"
            data-toggle="modal"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            type="submit"
            data-target="#myModal">
            {language.Save}
          </Button>
          <div className="filler-div" />

          <Button
            type="button"
            color="primary"
            variant="contained"
            data-toggle="modal"
            data-target="#myModal"
            onClick={onCancel}>
            {language.Cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
