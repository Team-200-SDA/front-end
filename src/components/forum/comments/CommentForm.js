import React, { useState } from "react";
import CommentsApi from "../../../api/CommentsApi";
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LanguageContext';


export default function CommentForm({
  initialBody,
  onCancel,
  formTitle,
  setIsFormOpen,
  post,
  isUpdate,
  comment,
}) { //props come from Comment


  const [body, setBody] = useState(initialBody || "");
  const { language } = useContext(LangContext);
  const onCreateCommentClick = (e) => {
    e.preventDefault();
    const commentData = { body, post: post };
    return CommentsApi.createComment(commentData).then(() =>
      setIsFormOpen(false)
    );
  };

  const onUpdateCommentClick = (e) => {
    e.preventDefault();
    const updatedComment = { ...comment, body };
    return CommentsApi.updateComment(updatedComment).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">{formTitle || "Create a comment"}</h4>
        <form onSubmit={isUpdate ? onUpdateCommentClick : onCreateCommentClick}>
          <div className="form-group">
            <label>{language.Body}</label>
            <textarea
              className="form-control"
              placeholder={language.Comment_Body}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-info" t ype="submit">
              {language.Save}
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={onCancel}
            >
              {language.Cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
