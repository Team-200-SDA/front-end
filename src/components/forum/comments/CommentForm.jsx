//Component and react imports
import React, { useState } from "react";
import CommentsApi from "../../../api/CommentsApi";
import { useContext } from "react";
import { LangContext } from "../../../js/states/LanguageContext";

//Styling import
import { Button } from "@material-ui/core";

/**
 * This component provides the necessary form to create comments to specific posts.
 *
 */
export default function CommentForm({
  initialBody,
  onCancel,
  formTitle,
  setIsFormOpen,
  post,
  isUpdate,
  onSaveUpdatedComment,
  comment,
  getAllCommentsByPostId,
}) {
  //props come from Comment

  const [body, setBody] = useState(initialBody || "");
  const { language } = useContext(LangContext);

  /**
   *  @param {*} e
   * preventDefault takes current event as parameter and prevents the page from refreshing.
   * Takes the current post information and creates comment.
   */
  const onCreateComment = async (e) => {
    e.preventDefault();
    const commentData = { body, post: post };
    await CommentsApi.createComment(commentData);
    setIsFormOpen(false);
  };

  /**
   * @param {*} e
   * preventDefault takes current event as parameter and prevents the page from refreshing.
   * Takes the current comment information and updates the body of the comment
   */
  const onUpdateComment = async (e) => {
    e.preventDefault();
    const updatedComment = { ...comment, body };
    await CommentsApi.updateComment(updatedComment);
    onSaveUpdatedComment(false);
    getAllCommentsByPostId();
  };

  return (
    <div className="create-comment">
      <h4 className="card-title">{formTitle || "Create a comment"}</h4>

      <form
        onSubmit={
          /* If variable isUpdate true then calls updates the comment.
            If variable isUpdate false then creates a new comment */
          isUpdate ? (e) => onUpdateComment(e) : (e) => onCreateComment(e)
        }
      >
        <div className="form-group">
          <label>{language.Body}</label>
          <textarea
            className="form-control subject-input"
            placeholder={language.Comment_Body}
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
            type="submit"
            data-target="#myModal"
          >
            {language.Save}
          </Button>

          <div className="filler-div" />
          <Button
            type="button"
            color="primary"
            variant="contained"
            data-toggle="modal"
            data-target="#myModal"
            onClick={onCancel}
          >
            {language.Cancel}
          </Button>
        </div>
      </form>
    </div>
  );
}
